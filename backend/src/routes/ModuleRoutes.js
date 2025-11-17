import { Router } from "express";
import {ModuleController} from "../controllers/ModuleController.js";

const router = Router();

router.post("/create", ModuleController.create);

router.get("/getall", ModuleController.getAll);

router.get("/get", ModuleController.getById);

router.put("/update", ModuleController.update);

router.delete("/delete", ModuleController.delete);

router.post("/command", ModuleController.generateCommand);

router.get("/status", ModuleController.getStatus);

router.get("/logs", ModuleController.getLogs)

export default router;
