import { connect } from "nats";

let nc;

export async function initNats() {
  nc = await connect({ servers: "nats://localhost:4222" });
  console.log("✅ Conectado ao NATS");
  return nc;
}

export function getNatsClient() {
  if (!nc) throw new Error("NATS não inicializado");
  return nc;
}
