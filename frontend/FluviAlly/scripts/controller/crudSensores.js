// ----- Função auxiliar para feedback visual -----
function showAlert(message, color = '#4caf50') {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.style.backgroundColor = color;

    // Garante a animação (força reflow)
    alertBox.classList.remove('show');
    void alertBox.offsetWidth;
    alertBox.classList.add('show');

    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 2000);
}

// ----- Alternar entre editar/salvar -----
function toggleEdit(button) {
    const row = button.closest('.admin-sensor-row');
    const currentElement = row.querySelector('.admin-sensor-label, .admin-sensor-input');

    if (currentElement.classList.contains('admin-sensor-input')) {
        // ----- Salvar -----
        const newName = currentElement.value.trim() || 'Sem nome';
        const newSpan = document.createElement('span');
        newSpan.className = 'admin-sensor-label';
        newSpan.textContent = newName;
        row.replaceChild(newSpan, currentElement);
        button.textContent = '✎';
        showAlert('Salvo com sucesso!');
    } else {
        // ----- Editar -----
        const input = document.createElement('input');
        input.className = 'admin-sensor-input';
        input.type = 'text';
        input.value = currentElement.textContent.trim();
        row.replaceChild(input, currentElement);
        input.focus();
        button.textContent = '💾';
    }
}

// ----- Modal de confirmação -----
let sensorToDelete = null;
const modal = document.getElementById('confirmModal');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

document.querySelectorAll('.admin-sensor-delete').forEach(button => {
    button.addEventListener('click', () => {
        sensorToDelete = button.closest('.admin-sensor-row');
        modal.style.display = 'flex';
    });
});

confirmYes.addEventListener('click', () => {
    if (sensorToDelete) {
        sensorToDelete.remove();
        showAlert('Excluído com sucesso!', '#d32f2f');
    }
    modal.style.display = 'none';
});

confirmNo.addEventListener('click', () => {
    modal.style.display = 'none';
});

// ----- Botões de edição -----
document.querySelectorAll('.admin-sensor-edit').forEach(button => {
    button.addEventListener('click', () => toggleEdit(button));
});

// ----- Adicionar nova entrada -----
document.querySelector('.admin-sensor-add').addEventListener('click', () => {
    const container = document.querySelector('.admin-sensor-content');
    const newRow = document.createElement('div');
    newRow.className = 'admin-sensor-row';
    newRow.innerHTML = `
        <div class="admin-sensor-actions">
            <button class="admin-sensor-edit">✎</button>
            <button class="admin-sensor-delete">✖</button>
        </div>
        <span class="admin-sensor-label">Nova Entrada</span>
    `;
    container.appendChild(newRow);

    // Reaplica eventos
    newRow.querySelector('.admin-sensor-edit').addEventListener('click', (e) => toggleEdit(e.target));
    newRow.querySelector('.admin-sensor-delete').addEventListener('click', () => {
        sensorToDelete = newRow;
        modal.style.display = 'flex';
    });
});
