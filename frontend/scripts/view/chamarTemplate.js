const user = document.querySelector('.user')
const loginBtn = document.querySelector('.login')

loginBtn.addEventListener("click", () => {

    const tipoUsuario = user.value.toLowerCase()
    let role = 'user'

    if (tipoUsuario === 'admin') {
        role = 'admin'
    }

    sessionStorage.setItem('tipoUsuario', role)
    window.location.href = 'template.html'
})
