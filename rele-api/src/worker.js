import dotenv from "dotenv";
import axios from "axios";
import { connect } from "./db/conn.js";
import { analisarSensores } from "./automation.js";
import { sendCommand } from "./sendCommand.js";
import { initNats } from "./nats/natsClient.js";

dotenv.config();

const DEVICE_IP = process.env.DEVICE_IP;
const TOKEN = process.env.TOKEN;

async function main() {
  // 1️ Conecta ao MongoDB
  await connect();
  console.log("✅ Conectado ao MongoDB");

  // 2️ Inicializa NATS
  const nc = await initNats();

  // 3️ Inicia listener NATS
  sendCommand(nc, DEVICE_IP, TOKEN);


  // 4 Polling de status do módulo (independente do NATS)
  setInterval(async () => {
    try {
      const url = `http://${DEVICE_IP}/api/prd0025/inputs`;
      const resposta = await axios.get(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      console.log("📡 Dados recebidos do módulo:", resposta.data);

      // publica o status no nats
      if (nc) {
        nc.publish(
          "status",
          JSON.stringify({
            device: DEVICE_IP,
            status: resposta.data,
            timestamp: new Date().toISOString(),
          })
        );
      } else {
        console.warn("⚠️ NATS não inicializado — status não publicado");
      }

      await analisarSensores(resposta.data, DEVICE_IP, TOKEN);
    } catch (err) {
      console.error("❌ Erro no polling do módulo:", err.message);
    }
  }, 5000);
}

main();
