
const formulario= document.querySelector("#formulario-login");
formulario.addEventListener('submit',login(formulario));

// Realiza una solicitud POST al servidor con los datos de inicio de sesión

function login(formulario){
    const username = formulario.username; // Reemplaza esto con el nombre de usuario ingresado por el usuario
    const password = formulario.password; // Reemplaza esto con la contraseña ingresada por el usuario
    console.log(password.value);

fetch('http://181.141.4.209:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
})
  .then((response) =>  response.json())
  .then((data) => {
    // Obtiene el JWT del objeto de respuesta
    console.log(data);
    const jwt = data.token;

    // Almacena el JWT en el localStorage
    localStorage.setItem('jwt', jwt);

    // Redirige al usuario a la página de inicio o cualquier otra página que desees
    window.location.href = '/';
  })
  .catch((error) => {
    console.error('Error al iniciar sesión:', error);
  });
}
