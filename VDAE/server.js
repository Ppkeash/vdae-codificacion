const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');

// Agregar estas nuevas líneas para Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3001; // Cambia a un puerto que no esté en uso

// Configuración de Swagger
const swaggerOptions = {
definition: {
    openapi: '3.0.0',
    info: {
    title: 'API de VDAE',
    version: '1.0.0',
    description: 'Documentación de la API para la tienda de aparatos electrónicos VDAE',
    },
    servers: [
    {
        url: `http://localhost:${port}`,
        description: 'Servidor de desarrollo', },
    ],
    },
  apis: ['./swagger.js', './server.js'], // Ruta al archivo que contiene las rutas y comentarios de Swagger junto a la documentación aparte de swagger.js
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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

// API: Listar todos los productos
app.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos' });
            return;
        }
        res.json(results);
    });
});

// API: Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM productos WHERE ProductoID = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error al obtener el producto' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json(results[0]);
        }
    });
});

// API: Crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const { Nombre, Descripcion, Precio, Stock } = req.body;
    const query = 'INSERT INTO productos (Nombre, Descripcion, Precio, Stock) VALUES (?, ?, ?, ?)';
    connection.query(query, [Nombre, Descripcion, Precio, Stock], (err, result) => {
        if (err) {
            console.error('Error al crear el producto:', err);
            res.status(500).json({ error: 'Error al crear el producto' });
            return;
        }
        res.status(201).json({ id: result.insertId, Nombre, Descripcion, Precio, Stock });
    });
});

// API: Actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion, Precio, Stock } = req.body;
    const query = 'UPDATE productos SET Nombre = ?, Descripcion = ?, Precio = ?, Stock = ? WHERE ProductoID = ?';
    connection.query(query, [Nombre, Descripcion, Precio, Stock, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json({ message: 'Producto actualizado exitosamente' });
        }
    });
});

// API: Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos WHERE ProductoID = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json({ message: 'Producto eliminado exitosamente' });
        }
    });
});


app.get('/api/productos', (req, res) => {
    console.log('Solicitud recibida para /api/productos');
    const query = 'SELECT * FROM productos';
    // ... resto del código
});

// API DEL CARRITO

// Añadir al carrito
app.post('/api/carrito', (req, res) => {
    const { usuario_id, productoID, cantidad } = req.body;
    const query = 'INSERT INTO carrito (usuario_id, productoID, cantidad) VALUES (?, ?, ?)';

    connection.query(query, [usuario_id, productoID, cantidad], (err, result) => {
        if (err) {
            console.error('Error al añadir al carrito:', err);
            return res.status(500).json({ error: 'Error al añadir al carrito' });
        }
        res.status(201).json({ message: 'Producto añadido al carrito', id: result.insertId });
    });
});

// Eliminar del carrito
app.delete('/api/carrito/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM carrito WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar del carrito:', err);
            return res.status(500).json({ error: 'Error al eliminar del carrito' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item no encontrado en el carrito' });
        }
        res.json({ message: 'Producto eliminado del carrito' });
    });
});

// Obtener contenido del carrito
app.get('/api/carrito/:usuario_id', (req, res) => {
    const usuario_id = req.params.usuario_id;
    const query = `
        SELECT c.id, c.cantidad, p.ProductoID as producto_id, p.Nombre, p.Precio
        FROM carrito c
        JOIN productos p ON c.productoID = p.ProductoID
        WHERE c.usuario_id = ?;
    `;

    connection.query(query, [usuario_id], (err, results) => {
        if (err) {
            console.error('Error al obtener el contenido del carrito:', err);
            return res.status(500).json({ error: 'Error al obtener el contenido del carrito' });
        }
        res.json(results);
    });
});


// API DE LOS PEDIDOS

// Crear pedido
app.post('/api/pedidos', (req, res) => {
    const { clienteID, productos } = req.body; // Asegúrate de que esto coincida con el JSON

    // Validar cliente
    connection.query('SELECT * FROM clientes WHERE ClienteID = ?', [clienteID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });

        // Validar que hay productos
        if (!productos || productos.length === 0) {
            return res.status(400).json({ error: 'Se deben proporcionar productos' });
        }

        // Obtener precios de los productos
        const productoIds = productos.map(p => p.productoID); // Asegúrate de que esto coincida
        connection.query('SELECT ProductoID, Precio FROM productos WHERE ProductoID IN (?)', [productoIds], (err, precios) => {
            if (err) return res.status(500).json({ error: err.message });

            const preciosMap = {};
            precios.forEach(p => {
                preciosMap[p.ProductoID] = p.Precio;
            });

            let total = 0;
            const detalles = [];
            for (const producto of productos) {
                const precio = preciosMap[producto.productoID]; // Asegúrate de que esto coincida
                if (!precio) {
                    return res.status(404).json({ error: `Producto ID ${producto.productoID} no encontrado` });
                }
                total += precio * producto.cantidad;
                detalles.push([null, producto.productoID, producto.cantidad]);
            }

            // Insertar pedido
            connection.query('INSERT INTO pedidos (ClienteID, Total) VALUES (?, ?)', [clienteID, total], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                const pedidoId = result.insertId;

                // Insertar detalles del pedido
                const queryDetalles = 'INSERT INTO detalles_pedido (PedidoID, ProductoID, Cantidad) VALUES ?';
                connection.query(queryDetalles, [detalles.map(d => [pedidoId, d[1], d[2]])], (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ mensaje: 'Pedido creado', pedidoId });
                });
            });
        });
    });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
