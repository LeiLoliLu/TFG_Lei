const adminLoginForm = document.getElementById("adminLoginForm");

if(adminLoginForm!=null){
    adminLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const adminEmail = document.getElementById("adminEmail").value;
        const adminPassword = document.getElementById("adminPassword").value;
        const adminSecretKey = document.getElementById("adminSecretKey").value;

        iniciarSesionAdmin(adminEmail, adminPassword, adminSecretKey);
    });
}

function iniciarSesionAdmin(email, password, secretKey) {
    fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminEmail: email, adminPassword: password, adminSecretKey: secretKey })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Inicio de sesión de administrador fallido');
        }
        window.location.href = '/admin/dashboard';
    })
    .catch(error => {
        console.error('Error al iniciar sesión de administrador:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Realizar una solicitud Fetch para obtener los datos de los usuarios y llenar la tabla
    fetch('/admin/users')
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById("userTableBody");
            data.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.progress}</td>
                    <td>
                        <button class="deleteBtn" data-id="${user.username}">Delete</button>
                        <button class="updateBtn" data-id="${user.id}">Update</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });

            // Agregar eventos a los botones "Delete" y "Update"
            const deleteBtns = document.querySelectorAll(".deleteBtn");
            const updateBtns = document.querySelectorAll(".updateBtn");
            const newUserBtn = document.getElementById("newUserBtn");

            updateBtns.forEach(button => {
                button.addEventListener("click", function() {
                    const userId = button.dataset.id;
                    abrirFormularioActualizacion(userId);
                });
            });

            deleteBtns.forEach(btn => {
                btn.addEventListener("click", function() {
                    const username = this.getAttribute("data-id");
                    // Realizar una solicitud fetch para borrar el usuario con el ID userId
                    fetch('/borrar-cuenta', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: username })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al borrar la cuenta');
                        }
                        // Actualizar la tabla de usuarios después de borrar el usuario
                        return fetch('/admin/users');
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Limpiar la tabla
                        userTableBody.innerHTML = "";
                        // Llenar la tabla con los datos actualizados de los usuarios
                        data.forEach(user => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${user.id}</td>
                                <td>${user.email}</td>
                                <td>${user.username}</td>
                                <td>${user.password}</td>
                                <td>${user.progress}</td>
                                <td>
                                    <button class="deleteBtn" data-id="${user.id}">Delete</button>
                                    <button class="updateBtn" data-id="${user.id}">Update</button>
                                </td>
                            `;
                            userTableBody.appendChild(row);
                        });
                    })
                    .catch(error => {
                        console.error('Error al borrar la cuenta:', error);
                    });
                });
            });

            newUserBtn.addEventListener("click", function() {
                registroForm.style.display = "block";
            });

            // Obtener referencia al formulario de registro
    const crearUsuarioForm = document.getElementById("crearUsuarioForm");

    // Agregar evento al formulario de registro para enviar los datos al servidor
    crearUsuarioForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const email = document.getElementById("emailRegistro").value;
        const usuario = document.getElementById("usuarioRegistro").value;
        const contrasena = document.getElementById("contrasenaRegistro").value;
        progressJSON = JSON.stringify(emptyprogress);
        // Realizar una solicitud fetch para registrar el nuevo usuario
        fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailRegistro: email, usuarioRegistro: usuario, contrasenaRegistro: contrasena, progressRegistro: progressJSON, currentInvRegistro: emptyinv})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }
            // Si el registro es exitoso, ocultar el formulario de registro
            registroForm.style.display = "none";
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
        });
    });


        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });
});

function abrirFormularioActualizacion(userId) {
    fetch(`/admin/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            // Mostrar los datos del usuario en el formulario de actualización
            document.getElementById("emailUpdate").value = user.email;
            document.getElementById("usuarioUpdate").value = user.username;
            document.getElementById("contrasenaUpdate").value = user.password;
            // Mostrar el formulario de actualización
            document.getElementById("updateForm").style.display = "block";

            // Agregar evento para el envío del formulario de actualización
            const updateForm = document.getElementById("updateUserForm");
            updateForm.addEventListener("submit", function(event) {
                event.preventDefault();
                const emailUpdate = document.getElementById("emailUpdate").value;
                const usuarioUpdate = document.getElementById("usuarioUpdate").value;
                const contrasenaUpdate = document.getElementById("contrasenaUpdate").value;
                actualizarUsuario(userId, emailUpdate, usuarioUpdate, contrasenaUpdate);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
        });
}

function actualizarUsuario(userId, email, usuario, contrasena) {
    // Enviar los datos actualizados del usuario al servidor
    fetch(`/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, username: usuario, password: contrasena })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }
        // Actualización exitosa, ocultar el formulario de actualización
        document.getElementById("updateForm").style.display = "none";
        window.location.reload();
    })
    .catch(error => {
        console.error('Error al actualizar el usuario:', error);
    });
}

emptyprogress = {
    "hasPetalos": false,
    "hasRaices": false,
    "hasPolen": false,
    "hasAurora": false,
    "gold":0,
    "recipesUnlocked":[]
  }
emptyinv = {
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