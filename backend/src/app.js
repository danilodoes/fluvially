import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import ModuleRoutes from "./routes/ModuleRoutes.js";
import { initNats } from "./nats/natsClient.js";
import { connect } from "./db/conn.js";
dotenv.config();


const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}))


export const nc = await initNats();

await connect()



app.use("/users", UserRoutes);
app.use("/module", ModuleRoutes);

app.listen(process.env.PORT, () => {
    console.log(`servidor rodando na porta ${process.env.PORT}`)
});