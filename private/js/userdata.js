var currentInv = {
  "i1": 0,
  "i2": 0,
  "i3": 0,
  "i4a": 0,
  "i4b": 0,
  "i5": 0,
  "i6": 0,
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": 0,
  "11": 0,
  "12": 0,
  "13": 0,
  "14": 0,
  "15": 0,
  "16": 0,
  "17": 0,
  "18": 0,
  "19": 0,
  "20": 0,
  "21": 0,
  "22": 0,
  "23": 0,
  "24": 0,
  "25": 0,
  "26": 0,
  "27": 0,
  "28": 0,
  "29": 0,
  "30": 0,
  "31": 0,
  "32": 0,
  "33": 0,
  "34": 0,
  "35": 0,
  "36": 0,
  "37": 0,
  "38": 0
};

var progress = {
  "hasPetalos": false,
  "hasRaices": false,
  "hasPolen": false,
  "hasAurora": false,
  "gold":0,
  "recipesUnlocked":[]
}

document.getElementById("formularioRegistro").addEventListener("submit", function(event) {

  event.preventDefault();
  const email = document.getElementById("emailRegistro").value;
  const usuario = document.getElementById("usuarioRegistro").value;
  const contrasena = document.getElementById("contrasenaRegistro").value;
  
  // Llamar a la función registrarUsuario con los datos del formulario
  registrarUsuario(email, usuario, contrasena, progress);
});

document.getElementById("formularioInicioSesion").addEventListener("submit", function(event) {

  event.preventDefault();
  const emailouser = document.getElementById("emailUsuarioInicioSesion").value;
  const contrasena = document.getElementById("contrasenaInicioSesion").value;
  

  iniciarSesion(emailouser,contrasena);
});


function iniciarSesion(email, contrasena) {
  // Realizar la solicitud de inicio de sesión al servidor
  fetch('/inicio-sesion', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailUsuarioInicioSesion: email, contrasenaInicioSesion: contrasena })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Usuario o contraseña incorrectos');
      }
      return response.json();
  })
  .then(data => {
      // Actualizar la variable progress con los datos recibidos del servidor
      progress = JSON.parse(data.progress);
      localStorage.setItem('username', data.username);
      actualizarInterfaz();
      guardarEnLocalStorage();
      cargarDesdeLocalStorage();
      goldmeter.innerHTML = "Oro: " + progress.gold;
  })
  .catch(error => {
      console.error('Error al iniciar sesión:', error);
      // Manejar el error de inicio de sesión
  });
}

function actualizarInterfaz() {
  const username = localStorage.getItem('username');
  if (username) {
      document.getElementById('settings').classList.add('hidden');
      document.getElementById('usuario').innerText = "Bienvenido, "+username;
      document.getElementById('acciones').classList.remove('hidden');
  } else {
      document.getElementById('settings').classList.remove('hidden');
      document.getElementById('usuario').innerText = '';
      document.getElementById('acciones').classList.add('hidden');
  }
}

// Función para registrar un nuevo usuario
function registrarUsuario(email, usuario, contrasena, progressJSON) {
  progressJSON = JSON.stringify(progressJSON);
  // Realizar la solicitud de registro al servidor
  fetch('/registro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailRegistro: email, usuarioRegistro: usuario, contrasenaRegistro: contrasena, progressRegistro: progressJSON })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al registrar usuario');
      }
      // Continuar con otras acciones después del registro exitoso
  })
  .catch(error => {
      console.error('Error al registrar usuario:', error);
      // Manejar el error de registro
  });
}
