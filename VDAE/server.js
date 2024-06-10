const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3001; // Cambia a un puerto que no esté en uso

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Bermudez2020*',
    database: 'vdae',
    port: 3307
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar el directorio de archivos estáticos
app.use('/estilos', express.static(path.join(__dirname, 'estilos')));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Rutas para servir los archivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'contacto.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'registro.html'));
});

// Ruta para manejar el envío del formulario de contacto
app.post('/submit-contacto', (req, res) => {
    const { nombre, correoElectronico, telefono, mensaje } = req.body;

    const query = 'INSERT INTO contacto (nombre, correoElectronico, telefono, mensaje) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, correoElectronico, telefono, mensaje], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.status(500).send(`Error al guardar los datos en la base de datos: ${err.message}`);
            return;
        }
        // Redirigir a la página de éxito
        res.redirect('/html/contactoexitoso.html');
    });
});


// Ruta para obtener todos los contactos (Leer)
app.get('/contactos', (req, res) => {
    const query = 'SELECT * FROM contacto';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).send(`Error al consultar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.json(results);
    });
});

// Ruta para actualizar un contacto por ID (Actualizar)
app.put('/contacto/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correoElectronico, telefono, mensaje } = req.body;

    const query = 'UPDATE contacto SET nombre=?, correoElectronico=?, telefono=?, mensaje=? WHERE ContactoID=?';
    connection.query(query, [nombre, correoElectronico, telefono, mensaje, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar en la base de datos:', err);
            res.status(500).send(`Error al actualizar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.send('Contacto actualizado exitosamente.');
    });
});

// Ruta para eliminar un contacto por ID (Eliminar)
app.delete('/contacto/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM contacto WHERE ContactoID=?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar en la base de datos:', err);
            res.status(500).send(`Error al eliminar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.send('Contacto eliminado exitosamente.');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
