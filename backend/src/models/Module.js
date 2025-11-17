import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    names: {
      type: [String], // nomes das portas [porta1, porta2, porta3, porta4]
      validate: {
        validator: (arr) => arr.length === 4,
        message: "O módulo deve ter exatamente 4 portas nomeadas.",
      },
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Module = mongoose.model("Module", moduleSchema);
