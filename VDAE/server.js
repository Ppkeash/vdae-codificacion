const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001; // Cambia a un puerto que no esté en uso

// Lógica de renderizado de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para poder recibir JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.render('login', { mensaje: null, exito: null }); // Renderizar la página de login usando EJS
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

// Rutas para manejar clientes

// Obtener todos los clientes (Leer)
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).send(`Error al consultar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.json(results);
    });
});

// Crear un nuevo cliente (Crear)
app.post('/clientes', (req, res) => {
    const { Nombre, Apellido, CorreoElectronico, Contraseña } = req.body;
    const hashedPassword = bcrypt.hashSync(Contraseña, 10); // Encriptar la contraseña

    const query = 'INSERT INTO clientes (Nombre, Apellido, CorreoElectronico, Contraseña) VALUES (?, ?, ?, ?)';
    connection.query(query, [Nombre, Apellido, CorreoElectronico, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.status(500).send(`Error al guardar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.status(201).json({ id: result.insertId, Nombre, Apellido, CorreoElectronico });
    });
});

// Actualizar un cliente por ID (Actualizar)
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params; // Asegúrate de que este valor sea numérico
    const { Nombre, Apellido, CorreoElectronico } = req.body;

    // Convertir el id a un número entero
    const clienteId = parseInt(id, 10);

    // Verificar si el id es un número válido
    if (isNaN(clienteId)) {
        return res.status(400).send('ID de cliente inválido');
    }

    const query = 'UPDATE clientes SET Nombre=?, Apellido=?, CorreoElectronico=? WHERE ClienteID=?';
    connection.query(query, [Nombre, Apellido, CorreoElectronico, clienteId], (err, result) => {
        if (err) {
            console.error('Error al actualizar en la base de datos:', err);
            res.status(500).send(`Error al actualizar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.send('Cliente actualizado exitosamente.');
    });
});

// Eliminar un cliente por ID (Eliminar)
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM clientes WHERE ClienteID=?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar en la base de datos:', err);
            res.status(500).send(`Error al eliminar los datos en la base de datos: ${err.message}`);
            return;
        }
        res.send('Cliente eliminado exitosamente.');
    });
});

// Ruta para manejar el envío del formulario de registro
app.post('/submit-registro', async (req, res) => {
    const { nombre, apellido, correoElectronico, contraseña } = req.body;

    try {
        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Insertar en la base de datos
        const query = 'INSERT INTO clientes (Nombre, Apellido, CorreoElectronico, Contraseña) VALUES (?, ?, ?, ?)';
        connection.query(query, [nombre, apellido, correoElectronico, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al insertar en la base de datos:', err);
                res.status(500).send('Error al guardar los datos en la base de datos');
                return;
            }
            // Redirigir a la página de éxito de registro
            res.redirect('/registro-exitoso');
        });
    } catch (err) {
        console.error('Error al cifrar la contraseña:', err);
        res.status(500).send('Error en el registro');
    }
});

// Ruta para manejar el inicio de sesión
app.post('/submit-login', (req, res) => {
    const { correoElectronico, contraseña } = req.body;

    const query = 'SELECT * FROM clientes WHERE CorreoElectronico = ?';
    connection.query(query, [correoElectronico], async (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ mensaje: 'Error al consultar los datos en la base de datos', exito: false });
        }

        if (results.length > 0) {
            const cliente = results[0];
            const isMatch = await bcrypt.compare(contraseña, cliente.Contraseña);

            if (isMatch) {
                return res.json({ exito: true });
            } else {
                return res.json({ mensaje: 'Correo electrónico o contraseña incorrecta', exito: false });
            }
        } else {
            return res.json({ mensaje: 'Correo electrónico o contraseña incorrecta', exito: false });
        }
    });
});

// Página de éxito para el inicio de sesión
app.get('/login-exitoso', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login-exitoso.html'));
});

// Página de éxito para el registro
app.get('/registro-exitoso', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'registro-exitoso.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
