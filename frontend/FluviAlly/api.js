async function sus() {
  const body = {
    action: "relay",
    mode: "pulse",
    position: 1,
    value: 2000,
  };

  await fetch("http://192.168.0.140/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function com() {
  const body = {
    action: "relay",
    mode: "pulse",
    position: 2,
    value: 2000,
  };

  await fetch("http://localhost:3000/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function lib() {
  const body = {
    action: "relay",
    mode: "pulse",
    position: 3,
    value: 2000,
  };

  await fetch("http://localhost:3000/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
