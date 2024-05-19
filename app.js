const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
let isAdminAuthenticated = false;

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
    isAdminAuthenticated = false;
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
    isAdminAuthenticated = false;
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

        const queryInventory = 'SELECT itemId, cantidad FROM almacen WHERE userId = ?';
        connection.query(queryInventory, [user.id], (errInventory, resultsInventory) => {
            if (errInventory) {
                console.error('Error al obtener el inventario del usuario:', errInventory);
                res.status(500).send('Error al obtener el inventario del usuario');
                return;
            }

            const inventory = {};
            resultsInventory.forEach(row => {
                inventory[row.itemId] = row.cantidad;
            });

            res.json({ username: user.username, progress: user.progress, inventory: inventory });
        });
    });
});
app.delete('/borrar-cuenta', (req, res) => {
    isAdminAuthenticated = false;
    const { username } = req.body;

    const query = 'DELETE FROM usuario WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error al borrar la cuenta:', err);
            res.status(500).send('Error al borrar la cuenta');
            return;
        }

        res.status(200).send('Cuenta borrada exitosamente');
    });
});
app.post('/actualizar-progreso', (req, res) => {
    isAdminAuthenticated = false;
    const { username, progress, currentInv } = req.body;

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


app.get('/admin/login', (req, res) => {
    isAdminAuthenticated = false;
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});
app.post('/admin/login', (req, res) => {
    isAdminAuthenticated = false;
    const { adminEmail, adminPassword, adminSecretKey } = req.body;

    const query = 'SELECT * FROM admin WHERE email = ?';
    connection.query(query, [adminEmail], async (err, results) => {
        if (err) {
            console.error('Error al buscar el administrador en la base de datos:', err);
            res.status(500).send('Error al iniciar sesión de administrador');
            return;
        }

        if (results.length === 0) {
            res.status(401).send('Email de administrador incorrecto');
            return;
        }

        const admin = results[0];
        const match = await bcrypt.compare(adminPassword, admin.password);
        if (!match || adminSecretKey !== admin.secretKey) {
            res.status(401).send('Credenciales de administrador incorrectas, se esperaba '+admin.password+", se recibió "+adminPassword+". "+match);

            return;
        }
        isAdminAuthenticated = true;
        res.redirect('/admin/dashboard');
    });
});
app.get('/admin/dashboard', (req, res) => {
    if (!isAdminAuthenticated) {
        res.redirect('/admin/login');
        return;
    }
    
    res.sendFile(path.join(__dirname,'admin-dashboard.html'));
});
app.get('/admin/users', (req, res) => {
    isAdminAuthenticated = true;
    const query = 'SELECT id, email, username, password, progress FROM usuario';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
            return;
        }


        res.json(results);
    });
});
app.get('/admin/users/:id', (req, res) => {
    isAdminAuthenticated = true;
    const userId = req.params.id;
    const query = 'SELECT id, email, username, progress FROM usuario WHERE id = ?';
    connection.query(query, [userId], async (err, results) => {
        if (err) {
            console.error('Error al obtener los detalles del usuario:', err);
            res.status(500).send('Error al obtener los detalles del usuario');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        const user = results[0];
        delete user.password;

        res.json(user);
    });
});

app.put('/admin/users/:id', async (req, res) => {
    isAdminAuthenticated = true;
    const userId = req.params.id;
    const { email, username, password } = req.body;

    try {

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;


        const query = 'UPDATE usuario SET email = ?, username = ?, password = ? WHERE id = ?';
        connection.query(query, [email, username, hashedPassword, userId], (err, results) => {
            if (err) {
                console.error('Error al actualizar los detalles del usuario:', err);
                res.status(500).send('Error al actualizar los detalles del usuario');
                return;
            }
            res.status(200).send('Detalles del usuario actualizados exitosamente');
        });
    } catch (err) {
        console.error('Error al procesar la solicitud de actualización de usuario:', err);
        res.status(500).send('Error al procesar la solicitud de actualización de usuario');
    }
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
