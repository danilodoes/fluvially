import axios from "axios";
import { saveLog } from "./log.js";


let ultimoEstado = null;
let ultimoAcionamento = 0;

export async function analisarSensores(dado, DEVICE_IP, TOKEN) {
  try {
    const valores = dado.value.split(",").map(Number);

    if (!Array.isArray(valores) || valores.length < 3) {
      console.error("Dado de sensor inválido:", dado);
      return;
    }

    const estadoAtual = valores.join(",");
    const agora = Date.now();

    // só processa se mudou OU se já passaram 10s desde o último acionamento
    if (estadoAtual === ultimoEstado && agora - ultimoAcionamento < 10000) return;
    ultimoEstado = estadoAtual;

    const [S1, S2, S3] = valores;
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;
    const horaFormatada = `${dataAtual.getHours()}:${dataAtual.getMinutes()}:${dataAtual.getSeconds()}`;

    let tipoAcionamento = null;

    // 1️⃣ Reservatório cheio → abre ladrão (A1)
    if (S1 === 1) {
      await enviarComando(DEVICE_IP, TOKEN, 1, 20000);
      tipoAcionamento = "liberar reservatório (A1)";
      console.log("💧 Reservatório cheio — abrindo ladrão (A1)");
    }

    // 2️⃣ Reservatório com água e solo seco → irrigação sustentável (A2)
    else if (S1 === 0 && S2 === 1 && S3 === 1) {
      await enviarComando(DEVICE_IP, TOKEN, 2, 20000);
      tipoAcionamento = "irrigação sustentável (A2)";
      console.log("🌱 Solo seco + reservatório ok — irrigação sustentável (A2)");
    }

    // 3️⃣ Reservatório vazio e solo seco → irrigação comum (A3)
    else if (S2 === 0 && S3 === 1) {
      await enviarComando(DEVICE_IP, TOKEN, 3, 20000);
      tipoAcionamento = "irrigação comum (A3)";
      console.log("🚰 Reservatório vazio + solo seco — irrigação comum (A3)");
    }

    // 4️⃣ Nenhuma ação
    else {
      console.log("✅ Sensores estáveis — nenhuma ação tomada.");
      return;
    }

    // Salva log
    if (tipoAcionamento) {
      await saveLog({
        data: dataFormatada,
        horario: horaFormatada,
        tipoAcionamento,
      });
      ultimoAcionamento = agora;
    }
  } catch (err) {
    console.error("Erro ao processar sensores:", err.message);
  }
}

async function enviarComando(DEVICE_IP, TOKEN, position, tempo) {
  const url = `http://${DEVICE_IP}/api/prd0025/command`;
  const params = {
    token: TOKEN,
    command: "pulse",
    position,
    value: tempo,
  };

  try {
    const res = await axios.get(url, { params });
    console.log(`🔁 Comando enviado → position ${position}, ${tempo}ms`, res.data);
  } catch (err) {
    console.error("❌ Erro ao enviar comando:", err.message);
  }
}
