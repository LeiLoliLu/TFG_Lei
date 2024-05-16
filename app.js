const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'OqfuLX-sC',
    database: 'idlealchemy'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con la base de datos');
});

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para el registro de usuarios
app.post('/registro', async (req, res) => {
    const { emailRegistro, usuarioRegistro, contrasenaRegistro, progressRegistro } = req.body;
    console.log(emailRegistro);
    console.log(usuarioRegistro);
    console.log(contrasenaRegistro);
    console.log(progressRegistro);
    
    try {
        const hashedPassword = await bcrypt.hash(contrasenaRegistro, 10);
        
        const query = 'INSERT INTO usuario (email, username, password, progress) VALUES (?, ?, ?, ?)';
        connection.query(query, [emailRegistro, usuarioRegistro, hashedPassword, progressRegistro], (err, results) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                res.status(500).send('Error al registrar el usuario');
                return;
            }
            res.send('Usuario registrado exitosamente');
        });
    } catch (err) {
        console.error('Error al procesar la solicitud de registro:', err);
        res.status(500).send('Error al procesar la solicitud de registro');
    }
});

// Ruta para el inicio de sesión de usuarios
app.post('/inicio-sesion', (req, res) => {
    const { emailUsuarioInicioSesion, contrasenaInicioSesion } = req.body;
    const query = 'SELECT * FROM usuario WHERE email = ? OR username = ?';
    
    connection.query(query, [emailUsuarioInicioSesion, emailUsuarioInicioSesion], async (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            res.status(500).send('Error al iniciar sesión');
            return;
        }
        
        if (results.length === 0) {
            res.status(401).send('Usuario o contraseña incorrectos');
            return;
        }
        
        const user = results[0];
        const match = await bcrypt.compare(contrasenaInicioSesion, user.password);
        if (!match) {
            res.status(401).send('Usuario o contraseña incorrectos');
            return;
        }
        
        // Enviar el progreso del usuario al cliente
        res.json({ username: user.username, progress: user.progress });
    });
});



// Configura el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura el directorio de archivos JavaScript
app.use('/js', express.static(path.join(__dirname, 'private/js')));

// Configura el directorio de archivos CSS
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// Configura el directorio de archivos assets
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
