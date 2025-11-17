// A PARTIR DAQUI, O CÓDIGO FINAL E CORRIGIDO PARA editModulos.js
const mockModulos = [
    {
        id: "0001",
        endereco: "Av Jabaquara, 1234",
        ip: "192.168.10.140",
        porta: "8100",
        usuario: "admin",
        senha: "H@rdp@$$"
    },
    {
        id: "0002",
        endereco: "Av Paulista, 400",
        ip: "10.0.0.50",
        porta: "8100",
        usuario: "user02",
        senha: "$3nh@12Tres"
    },
    {
        id: "0003",
        endereco: "Rua das Laranjas, 951",
        ip: "203.0.113.1",
        porta: "8100",
        usuario: "admin",
        senha: "Segur@1Do!53"
    }
];


function showModuleEditedToast() {
    const toastElement = document.getElementById('moduleEditedToast');

    // CORREÇÃO TOAST: Remove classe de perigo caso tenha sido aplicada antes
    toastElement.classList.remove('text-bg-danger');
    toastElement.classList.add('text-bg-success'); // Garante o verde

    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
}

function showModuleDeletedToast() {
    const toastElement = document.getElementById('moduleDeletedToast');

    // CORREÇÃO TOAST: Garante que o toast de exclusão use o vermelho
    toastElement.classList.remove('text-bg-success');
    toastElement.classList.add('text-bg-danger');

    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
}

function handleAdd(newModule) {

    const lastId = mockModulos.length > 0
        ? parseInt(mockModulos[mockModulos.length - 1].id)
        : 0;

    const newIdNumber = lastId + 1;
    const newId = newIdNumber.toString().padStart(4, '0'); // Garante formato "0004"


    const newModuleData = {
        id: newId,
        endereco: newModule.endereco,
        ip: newModule.ip,
        porta: newModule.porta,
        usuario: newModule.usuario,
        senha: newModule.senha,
    };


    mockModulos.push(newModuleData);

    return true;
}

function handleUpdate(id, newData) {
    const index = mockModulos.findIndex(m => m.id === id);
    if (index !== -1) {
        // Atualiza o objeto mock com os novos dados
        mockModulos[index].endereco = newData.endereco;
        mockModulos[index].ip = newData.ip;
        mockModulos[index].porta = newData.porta;
        mockModulos[index].usuario = newData.usuario;
        mockModulos[index].senha = newData.senha;
        return true;
    }
    return false;
}

function handleEdit(data) {
    // 1. Salva os dados completos para preenchimento do formulário
    sessionStorage.setItem('moduleToEdit', JSON.stringify(data));

    // 2. CORREÇÃO: Salva o ID do módulo separadamente para ser usado no 'Update' posterior.
    // O formulário de edição precisa saber qual ID está sendo salvo.
    sessionStorage.setItem('moduleIdBeingEdited', data.id);

    // Navega para a tela de Adição/Edição de Módulos
    location.hash = "#add-modulos";
}


function handleDelete(data) {
    const confirmation = confirm(`Tem certeza que deseja excluir o módulo ID ${data.id} - ${data.endereco}?`);

    if (confirmation) {
        // Remove do mock
        const index = mockModulos.findIndex(m => m.id === data.id);
        if (index !== -1) {
            mockModulos.splice(index, 1);
        }

        // 1. Mostra o Toast de Exclusão
        showModuleDeletedToast();

        // 2. CORREÇÃO 1: Atualiza a lista forçando a navegação
        setTimeout(() => {
            // A melhor forma é chamar a função de navegação diretamente.
            // Assumindo que 'navegar' (ou uma função de recarga) esteja global ou acessível.
            // Já que você está usando `navegar()` na janela, faremos isso:
            navegar(); // Força a re-renderização do mainContent
        }, 500);
    }
}


function initializeGerenciamentoScreen() {

    setTimeout(() => {
        const table = document.querySelector('.gerenciamento-table');
        if (table) {
            table.addEventListener('click', (e) => {
                const targetCell = e.target.closest('.action-btn');

                if (targetCell) {
                    const action = targetCell.dataset.action;
                    const id = targetCell.dataset.id;
                    const moduloData = mockModulos.find(m => m.id === id);

                    if (action === 'edit' && moduloData) {
                        handleEdit(moduloData);
                    } else if (action === 'delete' && moduloData) {
                        handleDelete(moduloData);
                    }
                }
            });
        }
    }, 50);
}