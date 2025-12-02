
import { Module } from "../models/Module.js";
import { nc } from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class ModuleController {
  // Criar novo
  static async create(req, res) {
    try {
      const { name, token, ip } = req.body;

      if (!name || name.length !== 4)
        return res
          .status(400)
          .json({
            error: "O campo 'name' deve conter 4 nomes (um para cada porta).",
          });

      const newModule = await Module.create({ name, token, ip });
      res.status(201).json(newModule);
    } catch (err) {
      console.error("Erro ao criar módulo:", err);
      res.status(500).json({ error: "Erro interno ao criar módulo." });
    }
  }

  // Buscar todos
  static async getAll(req, res) {
    try {
      const modules = await Module.find();
      res.status(200).json(modules);
    } catch (err) {
      console.error("Erro ao listar módulos:", err);
      res.status(500).json({ error: "Erro interno ao listar módulos." });
    }
  }

  // Buscar pelo id
  static async getById(req, res) {
    try {
      const module = await Module.findById(req.params.id);
      if (!module)
        return res.status(404).json({ error: "Módulo não encontrado." });
      res.status(200).json(module);
    } catch (err) {
      console.error("Erro ao buscar módulo:", err);
      res.status(500).json({ error: "Erro interno ao buscar módulo." });
    }
  }

  // atualizar
  static async update(req, res) {
    try {
      const { name, token, ip } = req.body;
      const updatedModule = await Module.findByIdAndUpdate(
        req.params.id,
        { name, token, ip },
        { new: true }
      );
      if (!updatedModule)
        return res.status(404).json({ error: "Módulo não encontrado." });
      res.status(200).json(updatedModule);
    } catch (err) {
      console.error("Erro ao atualizar módulo:", err);
      res.status(500).json({ error: "Erro interno ao atualizar módulo." });
    }
  }

  //   deletar
  static async delete(req, res) {
    try {
      const deletedModule = await Module.findByIdAndDelete(req.params.id);
      if (!deletedModule)
        return res.status(404).json({ error: "Módulo não encontrado." });
      res.status(200).json({ message: "Módulo removido com sucesso." });
    } catch (err) {
      console.error("Erro ao excluir módulo:", err);
      res.status(500).json({ error: "Erro interno ao excluir módulo." });
    }
  }

  static async generateCommand(req, res) {
    try {
      const { mode, position, value, id } = req.body;

      if (!["pulse", "set"].includes(mode))
        return res
          .status(400)
          .json({ error: "Modo inválido, use 'pulse' ou 'set'." });
      if (position < 1 || position > 4)
        return res
          .status(400)
          .json({ error: "A posição deve estar entre 1 e 4." });
      

      const command = {
        id,
        action: "relay",
        mode,
        position,
        value,
      };

      console.log(command);

      if (!nc) return res.status(500).json({ error: "NATS não inicializado." });

      nc.publish("command", JSON.stringify(command));

      res.status(200).json({ message: "Comando enviado!", command });
    } catch (err) {
      console.error("Erro ao gerar comando:", err);
      res.status(500).json({ error: "Erro interno ao gerar comando." });
    }
  }

  static async getStatus(req, res) {
    try {
      if (!nc) return res.status(500).json({ error: "NATS não inicializado." });

     
      let statusData = null;

      const sub = nc.subscribe("status", { max: 1 });

      const timeout = new Promise((resolve) =>
        setTimeout(() => resolve("timeout"), 2000)
      );

      const msgPromise = (async () => {
        for await (const m of sub) {
          statusData = JSON.parse(m.data);
          break;
        }
        return "ok";
      })();

      const result = await Promise.race([msgPromise, timeout]);

      if (result === "timeout" || !statusData) {
        return res.status(200).json({
          status: "offline",
          message: "Nenhum status recebido do módulo.",
        });
      }

      return res.status(200).json({
        status: "online",
        data: statusData,
      });
    } catch (err) {
      console.error("Erro ao verificar status:", err);
      res.status(500).json({ error: "Erro interno ao verificar status." });
    }
  }
static async getLogs(req, res) {
    try {
      // 1️ Conecta ao MongoDB
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado ao MongoDB dentro do controller");
      }

      // 2️ Acessa a collection diretamente
      const collection = mongoose.connection.collection("logs");

      // 3️ Busca os últimos 50 logs
      const logs = await collection
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return res.status(200).json(logs);
    } catch (err) {
      console.error("Erro ao buscar logs:", err);
      return res.status(500).json({ error: "Erro interno ao buscar logs." });
    }
  }

}
