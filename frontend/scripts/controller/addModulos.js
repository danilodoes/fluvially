
function showModuleAddedToast() {
    const toastElement = document.getElementById('moduleAddedToast');
    toastElement.classList.remove('text-bg-danger');
    toastElement.classList.add('text-bg-success');
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
}

function initializeAddModuleScreen(isEditing = false) {
    setTimeout(() => {
        const addButton = document.querySelector('.fab-add-module-container');

        if (addButton) {
            addButton.addEventListener('click', () => {

                // Se for edição, precisamos ler o ID e os novos dados
                let moduleId = null;
                if (isEditing) {
                    // Pega o ID do módulo que foi salvo no hash anterior
                    const moduleToEdit = JSON.parse(sessionStorage.getItem('moduleToEdit_temp_id') || '{}');
                    moduleId = moduleToEdit.id;
                }

                // 1. Coleta dos dados do formulário (usados para Add ou Edit)
                const newModuleData = {
                    id: moduleId, // Será null para adição
                    endereco: document.getElementById('endereco').value,
                    ip: document.getElementById('ipdns').value,
                    porta: document.getElementById('porta').value,
                    usuario: document.getElementById('usuario').value,
                    senha: document.getElementById('senha').value,
                };

                // Lógica de Edição ou Adição
                if (isEditing) {
                    // Chama a lógica de atualização (definida em editModulos.js)
                    // ** handleUpdate deve ser acessível globalmente para isso **
                    if (handleUpdate(moduleId, newModuleData)) {
                        showModuleEditedToast();
                        // Navega de volta para a lista após a edição
                        location.hash = "#edit-modulos";
                    } else {
                        console.error('Erro ao atualizar módulo!');
                    }
                } else {
                    console.log('Botão de ADICIONAR MÓDULO Clicado.');
                    // Aqui você adicionaria a lógica de ADIÇÃO real (novo ID, push para mockModulos, etc.)
                    showModuleAddedToast();
                }

            });
        }
    }, 50);
}

// function initializeAddModuleScreen(isEditing = false) {
//     setTimeout(() => {
//         const addButton = document.querySelector('.fab-add-module-container');

//         if (addButton) {
//             addButton.addEventListener('click', () => {

//                 // 1. Coleta dos dados do formulário
//                 const formData = {
//                     endereco: document.getElementById('endereco').value,
//                     ip: document.getElementById('ipdns').value,
//                     porta: document.getElementById('porta').value,
//                     usuario: document.getElementById('usuario').value,
//                     senha: document.getElementById('senha').value,
//                 };

//                 // Lógica de Edição ou Adição
//                 if (isEditing) {
//                     // CORREÇÃO: Obtém o ID do módulo sendo editado
//                     const moduleId = sessionStorage.getItem('moduleIdBeingEdited');

//                     if (moduleId) {
//                         // 2. Chama a função de atualização global (de editModulos.js)
//                         if (handleUpdate(moduleId, formData)) {
//                             showModuleEditedToast();

//                             // 3. Navega de volta para a lista (atualização visual)
//                             location.hash = "#edit-modulos";
//                         } else {
//                             console.error('Erro ao encontrar ou atualizar o módulo na lista.');
//                         }
//                     }

//                 } else {
//                     console.log('Botão de ADICIONAR MÓDULO Clicado.');
//                     // Lógica para adicionar novo módulo
//                     showModuleAddedToast();
//                 }

//             });
//         }
//     }, 50);
// }

function initializeAddModuleScreen(isEditing = false) {
    setTimeout(() => {
        const addButton = document.querySelector('.fab-add-module-container');

        if (addButton) {
            addButton.addEventListener('click', () => {

                let moduleId = null;
                if (isEditing) {
                    const moduleIdBeingEdited = sessionStorage.getItem('moduleIdBeingEdited');
                    moduleId = moduleIdBeingEdited;
                }

                // 1. Coleta dos dados do formulário (usados para Add ou Edit)
                const formData = {
                    id: moduleId, // Será o ID de edição ou null
                    endereco: document.getElementById('endereco').value,
                    ip: document.getElementById('ipdns').value,
                    porta: document.getElementById('porta').value,
                    usuario: document.getElementById('usuario').value,
                    senha: document.getElementById('senha').value,
                };

                // Lógica de Edição ou Adição
                if (isEditing) {
                    // CÓDIGO DE EDIÇÃO JÁ CORRIGIDO (handleUpdate)
                    const moduleId = sessionStorage.getItem('moduleIdBeingEdited');
                    if (moduleId && handleUpdate(moduleId, formData)) {
                        showModuleEditedToast();
                        location.hash = "#edit-modulos";
                    } else {
                        console.error('Erro ao editar módulo!');
                    }

                } else {
                    // CORREÇÃO: LÓGICA DE ADIÇÃO (CREATE)
                    if (handleAdd(formData)) { // Chama a função de adição global
                        showModuleAddedToast();

                        // Opcional: Limpar formulário após adição para adicionar outro
                        document.getElementById('endereco').value = '';
                        document.getElementById('ipdns').value = '';
                        // ... Limpar outros campos, se necessário ...

                        // Opcional: Navegar para a lista após adicionar
                        // location.hash = "#edit-modulos"; 
                    } else {
                        console.error('Falha ao adicionar novo módulo.');
                    }
                }
            });
        }
    }, 50);
}