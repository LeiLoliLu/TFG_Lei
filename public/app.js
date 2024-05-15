const express = require('express');
const path = require('path');
const app = express();

// Configura el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura el directorio de archivos JavaScript
app.use('/js', express.static(path.join(__dirname, 'private/js')));

app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.use('/assets/bgs', express.static(path.join(__dirname, 'assets/bgs')));

app.use('/assets/items', express.static(path.join(__dirname, 'assets/items')));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
