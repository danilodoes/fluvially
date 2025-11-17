
const mockUsers = [
    { id: '1', login: 'caio.furlan', senha: 'sup3p@S5' },
    { id: '2', login: 'henrique.lima', senha: 'sup3p@S5' },
    { id: '3', login: 'arthur.alisson', senha: 'sup3p@S5' },
    { id: '4', login: 'leonardo.fernandes', senha: 'sup3p@S5' },
    { id: '5', login: 'danilo.santos', senha: 'sup3p@S5' }    
];


const users = mockUsers;


function showUserToast(login, action) {
    // Usamos o login como identificador no feedback
    const displayLogin = login;

    const toastId = (action === 'added') ? 'userAddedToast' :
        (action === 'edited') ? 'userEditedToast' : 'userDeletedToast';

    const msg = (action === 'added') ? `Login '${displayLogin}' adicionado com sucesso!` :
        (action === 'edited') ? `Login '${displayLogin}' editado com sucesso!` :
            `Login '${displayLogin}' excluído com sucesso!`;

    const toastElement = document.getElementById(toastId);
    if (!toastElement) return;

    const isSuccess = (action === 'added' || action === 'edited');
    toastElement.classList.remove(isSuccess ? 'text-bg-danger' : 'text-bg-success');
    toastElement.classList.add(isSuccess ? 'text-bg-success' : 'text-bg-danger');
    toastElement.querySelector('.toast-body').textContent = msg;

    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
}


function handleAddUser(newUserData) {
    // 1. Gera ID sequencial
    const lastId = users.length > 0 ? parseInt(users[users.length - 1].id) : 0;
    const newId = (lastId + 1).toString();

    // 2. Cria o novo objeto apenas com ID, Login e Senha
    const newUser = {
        id: newId,
        login: newUserData.login, // Usa o campo de login diretamente do input
        senha: newUserData.senha,
    };

    users.push(newUser);
    return newUser.login; // Retorna o login para o Toast
}

function handleDeleteUser(id) {
    const userToDelete = users.find(u => u.id === id);

    if (!userToDelete) return false;
    // CORREÇÃO: Usa o login no alert
    const confirmation = confirm(`Tem certeza que deseja excluir o usuário "${userToDelete.login}"?`);

    if (confirmation) {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            showUserToast(userToDelete.login, 'deleted');
            return true;
        }
    }
    return false;
}

function handleEditUser(id, updatedData) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const originalUser = users[index];

        originalUser.login = updatedData.login;

        if (updatedData.senha && updatedData.senha.trim() !== '') {
            originalUser.senha = updatedData.senha;
        }

        return originalUser.login;
    }
    return false;
}

function startEditUser(userData) {
    const screen = document.getElementById('mainContent');
    // CORREÇÃO 1: O input agora é '#add-login'
    const loginInput = screen.querySelector('#add-login');
    const senhaInput = screen.querySelector('#add-senha');
    const addButton = screen.querySelector('.add-user-btn');

    loginInput.value = userData.login; // Preenche o valor correto
    senhaInput.value = '';
    loginInput.focus();
    addButton.dataset.editingId = userData.id;
    addButton.querySelector('i').className = 'bi bi-check-circle-fill';
    loginInput.placeholder = 'Editando: ' + userData.login;
}

function initializeCrudUsersScreen() {
    setTimeout(() => {
        const screen = document.getElementById('mainContent');
        if (!screen) return;

        const addButton = screen.querySelector('.add-user-btn');
        // CORREÇÃO 1: Select do input de login
        const loginInput = screen.querySelector('#add-login');
        const senhaInput = screen.querySelector('#add-senha');

        // 1. Listener de Adicionar/Salvar (único)
        addButton.addEventListener('click', (e) => {
            e.preventDefault();

            const login = loginInput.value.trim();
            const senha = senhaInput.value.trim();

            if (!login || !senha) {
                alert('Preencha o Login e a Senha para continuar.');
                return;
            }

            const editingId = addButton.dataset.editingId;
            let finalLogin = login;

            if (editingId) {
                // --- MODO EDIÇÃO ---
                const updatedData = { login, senha };
                finalLogin = handleEditUser(editingId, updatedData); // Chama o update

                if (finalLogin) {
                    showUserToast(finalLogin, 'edited');
                } else {
                    console.error('Falha ao editar usuário.');
                }

                // Limpa o estado de edição
                addButton.dataset.editingId = '';
                addButton.querySelector('i').className = 'bi bi-plus-circle-fill';
                loginInput.placeholder = 'Login';
            } else {
                // --- MODO ADIÇÃO ---
                const newUser = handleAddUser({ login, senha });

                if (newUser) {
                    showUserToast(newUser, 'added');
                }
            }

            // Limpa o formulário e re-renderiza a tela após a operação
            loginInput.value = '';
            senhaInput.value = '';
            navegar();
        });


        // 2. Listener de Edição/Exclusão (na lista)
        screen.addEventListener('click', (e) => {
            const target = e.target.closest('.list-action-btn');
            if (!target) return;

            const action = target.dataset.action;
            const userId = target.dataset.id;
            const userData = users.find(u => u.id === userId);

            if (action === 'delete') {
                if (handleDeleteUser(userId)) {
                    navegar();
                }
            } else if (action === 'edit' && userData) {
                startEditUser(userData);
            }
        });

        // Garante o estado inicial do botão ao carregar a tela
        addButton.dataset.editingId = '';
        addButton.querySelector('i').className = 'bi bi-plus-circle-fill';

    }, 100);
}


