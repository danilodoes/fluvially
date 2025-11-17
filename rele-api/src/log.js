import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    data: { type: String, required: true },        
    horario: { type: String, required: true },      
    tipoAcionamento: { type: String, required: true },
  },
  { timestamps: true }
);

export const Log = mongoose.model("logs", LogSchema);

export async function saveLog({ data, horario, tipoAcionamento }) {
  try {
    const log = new Log({ data, horario, tipoAcionamento });
    await log.save();
    console.log("🗒️ Log inserido no MongoDB:", log);
  } catch (err) {
    console.error("❌ Erro ao inserir log:", err.message);
  }
}