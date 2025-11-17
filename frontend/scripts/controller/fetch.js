
// document.addEventListener("DOMContentLoaded", () => {

//   console.log("carregou o bagui")
//   const comandos = {
//     sus: 1,
//     com: 2,
//     lib: 3
//   }

//   Object.entries(comandos).forEach(([classe, posicao]) => {
//     const elemento = document.querySelector(`.${classe}`)
//     if (elemento) {
//       elemento.addEventListener("click", async () => {

//         console.log("clicaram")
         
      
//         const body = {
//           id: "modulo123",
//           mode: "pulse",
//           position: posicao,
//           value: 1
//         }

        
//         try {
//           const resposta = await fetch("http://localhost:3000/module/command", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body)
//           })
//           if (!resposta.ok) throw new Error("Erro na requisição")
//           console.log(`Comando ${classe} enviado com sucesso`)
//         } catch (erro) {
//           console.error("Falha:", erro)
//         }
//       })
//     }
//   })
// })

