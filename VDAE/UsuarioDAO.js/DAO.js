const connection = require('../config/database');
const Usuario = require('../models/Usuario');

class UsuarioDAO {
    obtenerTodos(callback) {
        connection.query('SELECT * FROM usuarios', (err, results) => {
            if (err) return callback(err, null);
            const usuarios = results.map(row => new Usuario(row.id, row.nombre, row.email, row.password));
            callback(null, usuarios);
        });
    }

    crear(usuario, callback) {
        connection.query('INSERT INTO usuarios SET ?', usuario, (err, result) => {
            if (err) return callback(err, null);
            usuario.id = result.insertId;
            callback(null, usuario);
        });
    }

    // Otros métodos como actualizar, eliminar, etc.
}

module.exports = UsuarioDAO;
