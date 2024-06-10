const mysql = require('mysql');

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

// Inserción
const insertQuery = 'INSERT INTO contacto (nombre, correoElectronico, telefono, mensaje) VALUES (?, ?, ?, ?)';
const insertValues = ['Nombre del Contacto', 'correo@example.com', '1234567890', 'Mensaje del contacto'];

connection.query(insertQuery, insertValues, (err, result) => {
    if (err) {
        console.error('Error al insertar en la base de datos:', err);
        return;
    }
    console.log('Contacto insertado exitosamente:', result);
});
