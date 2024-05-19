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
  registrarUsuario(email, usuario, contrasena, progress, currentInv);
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
      progress = JSON.parse(data.progress);
      currentInv = data.inventory;
      localStorage.setItem('username', data.username);
      loadSettings();
      guardarEnLocalStorage();
      cargarDesdeLocalStorage();
      goldmeter.innerHTML = "Oro: " + progress.gold;
  })
  .catch(error => {
      console.error('Error al iniciar sesión:', error);
  });
}

function loadSettings() {
  const username = localStorage.getItem('username');
  if (username) {
      document.getElementById('settings').classList.add('hidden');
      document.getElementById('usuario').innerText = "Bienvenido, "+username;
      document.getElementById('acciones').classList.remove('hidden');
      document.getElementById('usersection').classList.remove('hidden');

  } else {
      document.getElementById('settings').classList.remove('hidden');
      document.getElementById('usuario').innerText = "";
      document.getElementById('acciones').classList.add('hidden');
      document.getElementById('usersection').classList.add('hidden');
  }
}

function clearSettings(){
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('usuario').innerText = "";
    document.getElementById('acciones').classList.add('hidden');
    document.getElementById('usersection').classList.add('hidden');
}

// Función para registrar un nuevo usuario
function registrarUsuario(email, usuario, contrasena, progressJSON, currentInvJSON) {
  progressJSON = JSON.stringify(progressJSON);
  // Realizar la solicitud de registro al servidor
  fetch('/registro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailRegistro: email, usuarioRegistro: usuario, contrasenaRegistro: contrasena, progressRegistro: progressJSON, currentInvRegistro: currentInvJSON})
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

function guardarDatos() {
  const username = localStorage.getItem('username');
  progressJSON = JSON.stringify(progress);
  fetch('/actualizar-progreso', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, progress: progressJSON, currentInv:currentInv})
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al guardar datos');
      }
      alert('Datos guardados exitosamente');
  })
  .catch(error => {
      console.error('Error al guardar datos:', error);
  });
}

function reiniciarProgreso(){
    let con = confirm("¿Estas seguro? Esto borrará todo tu progreso e inventario.");
    if(con){
        progress = {
            "hasPetalos": false,
            "hasRaices": false,
            "hasPolen": false,
            "hasAurora": false,
            "gold":0,
            "recipesUnlocked":[]
          }
        currentInv = {
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
          guardarDatos();
          guardarEnLocalStorage();
          cargarDesdeLocalStorage();
    }
}

function borrarDatos() {
    const confirmacion = confirm("¿Estás seguro de que quieres borrar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmacion) {
        // Realizar la solicitud de borrado al servidor
        fetch('/borrar-cuenta', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: localStorage.getItem('username') }) // Envía el nombre de usuario almacenado localmente
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al borrar la cuenta');
            }
            // Borrar los datos almacenados localmente y redirigir a la página de inicio de sesión
            cerrarSesion();
        })
        .catch(error => {
            console.error('Error al borrar la cuenta:', error);
            // Manejar el error de borrado de la cuenta
        });
    }
}

function cerrarSesion(){
    guardarDatos();
    localStorage.clear();
    progress = {
        "hasPetalos": false,
        "hasRaices": false,
        "hasPolen": false,
        "hasAurora": false,
        "gold":0,
        "recipesUnlocked":[]
      }
    currentInv = {
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
      location.reload();

    
}