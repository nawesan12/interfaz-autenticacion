import './style.css'

const formularioDeRegistro = document.getElementById("register")
const formularioDeLogin = document.getElementById("login")

const usernameInput = document.getElementById("r-username")
const emailInput = document.getElementById("r-email")
const fullnameInput = document.getElementById("r-fullname")
const avatarInput = document.getElementById("r-avatar")
const passwordInput = document.getElementById("r-password")
const birthInput = document.getElementById("r-birth")

const loginEmailInput = document.getElementById("l-email")
const loginPasswordInput = document.getElementById("l-password")

async function enviarDatos(usuario, ruta) {
  const res = await fetch(`http://localhost:3000/${ruta}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
  const datos = await res.json()

  return datos
}

formularioDeRegistro.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  const usuario = {
    username: usernameInput.value,
    password: passwordInput.value,
    fullname: fullnameInput.value,
    email: emailInput.value,
    avatar: avatarInput.value,
    fecha_de_nacimiento: birthInput.value
  }

  await enviarDatos(usuario, "registrar")

  formularioDeRegistro.reset()
})

formularioDeLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  const usuario = await enviarDatos({ email: loginEmailInput.value, password: loginPasswordInput.value }, "iniciar-sesion")

  if(usuario.msg) {
    alert(usuario.msg)
  } else {
    alert(`Sesion iniciada. Bienvenido ${usuario.username}!`)
    localStorage.setItem("datos-de-usuario", JSON.stringify(usuario))

    window.location.pathname = "perfil.html"
  }
})