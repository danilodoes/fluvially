import axios from "axios";

export async function sendCommand(nc, DEVICE_IP, TOKEN) {
  const sub = nc.subscribe("command");
  console.log("🛰️ Aguardando comandos em [command]");

  for await (const msg of sub) {
    try {
      const comando = JSON.parse(msg.data.toString());
      console.log(comando)
      const url = `http://${DEVICE_IP}/api/prd0025/command`;

      const resposta = await axios.post(url, comando, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      console.log("✅ Comando enviado e resposta:", resposta.data);

      await nc.publish(
        "logs",
        JSON.stringify({
          tipo: "command_sent",
          comando,
          resposta: resposta.data,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error("❌ Erro ao processar comando:", err.message);
      await nc.publish(
        "logs",
        JSON.stringify({
          tipo: "error",
          erro: err.message,
          timestamp: new Date().toISOString(),
        })
      );
    }
  }
}
