const tipoUsuario = "admin"; // ou 'user'


function renderNavbar() {
    const nav = document.querySelector(".funcionalidades");

    let html = `
    <a href="#acionamento-manual" class="fw-bold" style="margin-top: 50px;">Acionamentos Manuais</a>
    <a href="#estado-entradas" class="fw-bold">Estados dos sensores</a>
    <a href="#logs" class="fw-bold">Logs de Acionamentos</a>
    
   `;

    if (tipoUsuario === "admin") {
        html = `
        <a href="#acionamento-manual" class="fw-bold" style="margin-top: 50px;">Acionamentos Manuais</a>
        <a href="#estado-entradas" class="fw-bold">Estados dos sensores</a>
        <a href="#crud-usuarios" class="fw-bold">Gerenciar Usuários</a>
        <a href="#logs" class="fw-bold">Logs de Acionamentos</a>
    <hr>
                   <span class="sidebar-section-title">Módulos</span>
        <a href="#add-modulos">Adicionar Módulos</a>
        <a href="#edit-modulos">Gerenciar Módulos</a>
    
    `;
    }
    nav.innerHTML = html;
}

//Função para gerar a tabela da tela "Gerenciar Módulos"
function renderGerenciarModulos() {
    let tableRows = '';

    if (typeof mockModulos !== 'undefined') {
        mockModulos.forEach(modulo => {
            tableRows += `
  <tr data-module-id="${modulo.id}">
  <td>${modulo.id}</td>
  <td>${modulo.endereco}</td>
  <td class="d-none d-md-table-cell">${modulo.ip}</td>
  <td class="d-none d-md-table-cell">${modulo.porta}</td>
  <td class="d-none d-md-table-cell">${modulo.usuario}</td>
                      <td class="d-none d-md-table-cell text-muted">********</td> 
  <td class="action-btn" data-action="edit" data-id="${modulo.id}">
   <i class="bi bi-pencil-square"></i>
  </td>
  <td class="action-btn" data-action="delete" data-id="${modulo.id}">
   <i class="bi bi-x-octagon-fill text-danger"></i>
  </td>
  </tr>
 `;
        });
    }

    // Estrutura completa da tabela
    return `
 <h5 class="section-title">Gerenciamento de Módulos</h5>
 <div class="d-flex justify-content-center align-items-start w-100">
 <div class="gerenciamento-container">
<div class="gerenciamento-header">
<p>Lista de Módulos</p>
</div>
 <div class="tabela-wrapper">
 <table class="gerenciamento-table">
 <thead>
 <tr>
 <th>ID</th>
    <th>Localização</th>
    <th class="d-none d-md-table-cell">IP/DNS</th>
    <th class="d-none d-md-table-cell">Porta</th>
    <th class="d-none d-md-table-cell">Usuário</th>
                                    <th class="d-none d-md-table-cell">Senha</th>
    <th class="text-center">Editar</th>
    <th class="text-center">Excluir</th>
   </tr>
   </thead>
   <tbody>
   ${tableRows}
   </tbody>
  </table>
  </div>
 </div>
 </div>
`;
}


//Função que renderiza a lista do crud usuários
function renderUserList() {
    if (typeof users === 'undefined') return '';

    let userListHtml = '';
    users.forEach(user => {
        // Exibe os usuários. A senha é mascarada na visualização.
        userListHtml += `
      <div class="user-list-item" data-user-id="${user.id}">
        <div class="user-info">
                              <strong>Login: ${user.login}</strong>
          <span>Senha: ********</span>
        </div>
        <div class="list-actions">
          <button class="list-action-btn" data-action="edit" data-id="${user.id}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="list-action-btn" data-action="delete" data-id="${user.id}">
            <i class="bi bi-x-octagon-fill"></i>
          </button>
        </div>
      </div>
    `;
    });
    return userListHtml;
}

//Função para mudar o conteúdo do main conforme a seleção de funcionalidade no sistema 
function navegar() {
    const hash = location.hash || "#acionamento-manual";
    const app = document.getElementById("mainContent");

    if (hash === "#acionamento-manual") {
        app.innerHTML = `<h5 class="section-title">Acionamentos Manuais</h5>

    <div class="d-flex flex-column justify-content-center align-items-start w-100">
        <div class="container">
            <div class="device-header"><p><strong>ID - 0001</strong> | Avenida Jabaquara, nº 1234</p></div>
            <div class="device-card">

                <div class="row text-center">
                    <div class="col-6 control-btn sus" onclick="sus()">
                        <i class="bi bi-power"></i>
                        <div class="control-label">Irrigação Sustentável</div>
                    </div>
                    <div class="col-6 control-btn com" onclick="com()">
                        <i class="bi bi-power"></i>
                        <div class="control-label">Irrigação Comum</div>
                    </div>
                    <div class="col-6 control-btn lib" onclick="lib()">
                        <i class="bi bi-power"></i>
                        <div class="control-label">Liberar Reservatório</div>
                    </div>
                    <div class="col-6 control-btn">
                        <i class="bi bi-power"></i>
                        <div class="control-label">Função não-atribuída</div>
                    </div>
                </div>
                <div>
            </div>
        </div>
    </div>
    
    <div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
        <div id="commandSentToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Comando enviado com sucesso!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>`;
        initializeAcionamentoManualScreen();
    } else if (hash === "#logs") {
        app.innerHTML = `
        <h5 class="section-title">Logs de Acionamentos</h5>
        
        <div class="d-flex justify-content-center align-items-start w-100"> 

            <div class="container">
                <div class="header">
                    <p><strong>ID - 0001</strong> | Avenida Jabaquara, nº 1234</p>
                </div>

                <div class="table-responsive-scroll"> 
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Tipo de Acionamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>19/09/2025</td>
                                <td>03:30</td>
                                <td>Irrigação Sustentável</td>
                            </tr>
                            <tr>
                                <td>18/09/2025</td>
                                <td>12:30</td>
                                <td>Irrigação Sustentável</td>
                            </tr>
                            <tr>
                                <td>16/09/2025</td>
                                <td>22:00</td>
                                <td>Liberar Reservatório</td>
                            </tr>
                            <tr>
                                <td>14/09/2025</td>
                                <td>13:46</td>
                                <td>Irrigação Comum</td>
                            </tr>
                        </tbody>
                    </table>
                </div> </div>
        </div>
            `;

    } else if (hash === "#estado-entradas") {

        app.innerHTML = ` 
        <h5 class="section-title">Estado dos Sensores</h5> 
        <div class="d-flex justify-content-center align-items-start w-100">
        <div class="status-container">
            <div class="status-header">
                <p><strong>ID - 0001</strong> | Avenida Jabaquara, nº 1234</p>
            </div>

            <div class="status-content">
                <div class="status-row">
                    <span class="status-label">Nível Alto</span>
                    <span class="status-badge status-online">LIGADO</span>
                </div>
                <div class="status-row">
                    <span class="status-label">Nível Baixo</span>
                    <span class="status-badge status-online">LIGADO</span>
                </div>
                <div class="status-row">
                    <span class="status-label">Humidade</span>
                    <span class="status-badge status-online">LIGADO</span>
                </div>
                <div class="status-row">
                    <span class="status-label">Não Utilizado</span>
                    <span class="status-badge status-offline">DESLIGADO</span>
                </div>
            </div>
        </div>
        </div>`;

    } else if (hash === "#add-modulos" && tipoUsuario === "admin") {

        const moduleToEdit = sessionStorage.getItem('moduleToEdit');
        const isEditing = !!moduleToEdit;
        const data = isEditing ? JSON.parse(moduleToEdit) : {};


        if (isEditing) {
            sessionStorage.removeItem('moduleToEdit');
        }

        const title = isEditing ? 'Editar Módulo' : 'Adicionar Módulos';
        const btnIcon = isEditing ? 'bi-check-circle-fill' : 'bi-plus';
        const fabLabel = isEditing ? 'Confirmar Edição' : 'Adicionar Módulo';
        const initialSenha = data.senha || 'H@rdp@$$';

        app.innerHTML = `<h5 class="section-title">${title}</h5>

        <div class="d-flex justify-content-center align-items-start w-100">
            <div class="add-module-container">
                <div class="add-module-header">
                    <p><strong>Configuração do Módulo ${data.id || 'Novo'}</strong></p>
                </div>

                <div class="add-module-content">
                    <div class="module-field-row">
                        <label for="endereco" class="module-label">Endereço</label>
                        <input type="text" id="endereco" class="module-input" 
                            value="${data.endereco || ''}"
                            placeholder="Ex: Rua dos Estudantes, 171">
                    </div>

                    <div class="module-field-row">
                        <label for="ipdns" class="module-label">IP/DNS</label>
                        <input type="text" id="ipdns" class="module-input" 
                            value="${data.ip || ''}"
                            placeholder="Ex: 162.120.186.106">
                    </div>

                    <div class="module-field-row">
                        <label for="porta" class="module-label">Porta</label>
                        <input type="text" id="porta" class="module-input" 
                            value="${data.porta || ''}"
                            placeholder="8100">
                    </div>

                    <div class="module-field-row">
                        <label for="usuario" class="module-label">Usuário</label>
                        <input type="text" id="usuario" class="module-input" 
                            value="${data.usuario || ''}"
                            placeholder="admin">
                    </div>

                    <div class="module-field-row">
                        <label for="senha" class="module-label">Senha</label>
                        <input type="text" id="senha" class="module-input" 
                            value="${data.senha || ''}"
                            placeholder="H@rdp@$$">
                    </div>
                </div>

                <div class="fab-add-module-container" aria-label="${fabLabel}">
                    <i class="bi ${btnIcon}"></i>
                </div>
            </div>
        </div>`;
        initializeAddModuleScreen(isEditing);

    } else if (hash === "#edit-modulos" && tipoUsuario === "admin") {
        app.innerHTML = renderGerenciarModulos();
        initializeGerenciamentoScreen();

    } else if (hash === "#crud-usuarios" && tipoUsuario === "admin") {
        app.innerHTML = `<h5 class="section-title">Gerenciamento de Usuários</h5>
    <div class="d-flex justify-content-center align-items-start w-100">
      <div class="user-crud-container">
        
        <div class="crud-header">
       <p><strong>ID - 0001</strong> | Avenida Jabaquara, nº 1234</p></div>          
        

        <div class="crud-body">
         <div class="add-form-row">
                          <input type="text" id="add-login" placeholder="Login do Usuário">
  <input type="password" id="add-senha" placeholder="Senha">
  <button class="add-user-btn" data-action="add">
    <i class="bi bi-plus-circle-fill"></i>
  </button>
</div>

          <div class="user-list-wrapper">
            ${renderUserList()}
          </div>
        </div>

      </div>
    </div>`;
        initializeCrudUsersScreen();
    } else if (hash === "#agradecimento") {
        app.innerHTML = `
            <div class="d-flex justify-content-center align-items-center w-100 h-100" style="min-height: 70vh;">
                <div class="agradecimento-card">
                    
                    <img src="../../assets/fundo.jpeg" alt="Mascote FluviAlly" class="mascote-img">
                    
                    <h2>Obrigado pela atenção!</h2>
                    <p>Essa aplicação está disponível para clone gratuitamente no github</p>

                    <div class="participantes">
                        <h3>Conheça a nossa equipe:</h3>
                        <ul>
                            <li>Arthur Alisson de Brito Freitas – RA 823152183</li>
                            <li>Caio Furlan Ramos – RA 823160636</li>
                            <li>Leonardo Fernandes Carrilho – RA 821229981</li>
                            <li>Danilo do Espirito Santo dos Santos – RA 8222246362</li>
                            <li>Henrique Isaías de Lima – RA 8222243252</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        app.innerHTML =
            "<h1>Acesso Negado</h1><p>Você não tem permissão para ver esta página.</p>";
    }
}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", () => {
    renderNavbar();
    navegar();

    const fabButton = document.getElementById('fabButton');
    if (fabButton) {
        fabButton.addEventListener('click', () => {
            // Define a hash para a nova tela, disparando a navegação
            location.hash = "#agradecimento";
        });
    }
});

