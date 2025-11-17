async function sus() {
  const body = {
  id: "modulo123",
  mode: "pulse",
  position: 1,
  value: 5000
};

  await fetch("http://localhost:3000/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function com() {
  const body = {
  id: "modulo123",
  mode: "pulse",
  position: 2,
  value: 5000
};

  await fetch("http://localhost:3000/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function lib() {
  const body = {
  id: "modulo123",
  mode: "pulse",
  position: 3,
  value: 5000
};

  await fetch("http://localhost:3000/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
