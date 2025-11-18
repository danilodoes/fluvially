// async function sus() {
//   const body = {
//     id: "modulo123",
//     mode: "pulse",
//     position: 1,
//     value: 5000
//   };

//   await fetch("http://localhost:3000/module/command", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
// }

// async function com() {
//   const body = {
//     id: "modulo123",
//     mode: "pulse",
//     position: 2,
//     value: 5000
//   };

//   await fetch("http://localhost:3000/module/command", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
// }

// async function lib() {
//   const body = {
//     id: "modulo123",
//     mode: "pulse",
//     position: 3,
//     value: 5000
//   };

//   await fetch("http://localhost:3000/module/command", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
// }


/*
!!@Henrique, teste por favor se esse código refatorado funcionou corretamente.
!!O código antigo e funcionou foi apenas comentado, caso você precise testar depois, sem ter que subir através do commit anterior.
!!O comite anterior a esta alteração é o "70d48c61f5cafbd842d7b687bc364ae02504cb62"
*/

async function enviarComandoAoModulo(position) {
  const body = {
    id: "modulo123",
    mode: "pulse",
    position: position,
    value: 5000
  };

  console.log(`Enviando comando para o relé: ${position}`);

  const response = await fetch("http://localhost:3000/module/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`Erro ao enviar comando para a posição ${position}: ${response.statusText}`);
  }

  return response;
}


async function chamarSus() {
  await enviarComandoAoModulo(1);
}


async function chamarCom() {
  await enviarComandoAoModulo(2);
}


async function chamarLib() {
  await enviarComandoAoModulo(3);
}

