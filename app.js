const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

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

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/registro', async (req, res) => {
    const { emailRegistro, usuarioRegistro, contrasenaRegistro, progressRegistro, currentInvRegistro } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasenaRegistro, 10);

        const query = 'INSERT INTO usuario (email, username, password, progress) VALUES (?, ?, ?, ?)';
        connection.query(query, [emailRegistro, usuarioRegistro, hashedPassword, progressRegistro], (err, results) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                res.status(500).send('Error al registrar el usuario');
                return;
            }
            // Obtener el ID del usuario insertado
            const userId = results.insertId;

            const queryInventario = 'INSERT INTO almacen (userId, itemId, cantidad) VALUES (?, ?, ?)';

            for (const clave in currentInvRegistro) {
                if (currentInvRegistro.hasOwnProperty(clave)) {
                    const valor = currentInvRegistro[clave];
                    connection.query(queryInventario, [userId, clave, valor], (err, results) => {
                        if (err) {
                            console.error('Error al insertar el inventario:', err);

                        }
                    });
                }
            }
            res.send('Usuario registrado exitosamente');
        });
    } catch (err) {
        console.error('Error al procesar la solicitud de registro:', err);
        res.status(500).send('Error al procesar la solicitud de registro');
    }
});

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

        res.json({ username: user.username, progressjson: user.progress });
    });
});

app.post('/actualizar-progreso', (req, res) => {
    const { username, progress, currentInv } = req.body;

    // Actualización del progreso
    const queryProgress = 'UPDATE usuario SET progress = ? WHERE username = ?';
    connection.query(queryProgress, [progress, username], (errProgress, resultsProgress) => {
        if (errProgress) {
            console.error('Error al actualizar el progreso:', errProgress);
            res.status(500).send('Error al actualizar el progreso');
        }
    });
    const queryUpdateInventory = 'UPDATE almacen SET cantidad = ? WHERE userId = (SELECT id FROM usuario where username = ?) AND itemId = ?';
        for (const clave in currentInv) {
            if (currentInv.hasOwnProperty(clave)) {
                const valor = currentInv[clave];
                connection.query(queryUpdateInventory, [valor, username, clave], (err, results) => {
                    if (err) {
                        console.error('Error al insertar el inventario:', err);

                    }
                });
            }
        }
    res.status(200).send('Progreso y inventario actualizados exitosamente');
});



app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'private/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
