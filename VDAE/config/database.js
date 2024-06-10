const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1', // o 'localhost'
    user: 'root',
    password: 'Bermudez2020*',
    database: 'vdae',
    port: 3306 // Asegúrate de que este sea el puerto correcto
});

connection.connect((err) => {
        if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
        console.log('Connected to the database');
});

module.exports = connection;
