const UsuarioDAO = require('../dao/usuarioDAO');
const usuarioDAO = new UsuarioDAO();

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioDAO.obtenerTodos();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const crearUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    const usuario = { nombre, email, password };
    try {
        const nuevoUsuario = await usuarioDAO.crear(usuario);
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Otros métodos como actualizarUsuario, eliminarUsuario, etc.

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    // Exportar otros métodos
};
