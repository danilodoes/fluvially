// acionamentoManual.js

function showCommandSentToast() {
    const toastElement = document.getElementById('commandSentToast');
    if (toastElement && typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
        toast.show();
    }
}


function initializeAcionamentoManualScreen() {
    setTimeout(() => {
        const controlButtons = document.querySelectorAll('.control-btn');
        
        controlButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                
                showCommandSentToast();
            });
        });
    }, 500); 
}

