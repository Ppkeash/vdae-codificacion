/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - Nombre
 *         - Precio
 *       properties:
 *         ProductoID:
 *           type: integer
 *           description: ID auto-generado del producto
 *         Nombre:
 *           type: string
 *           description: Nombre del producto
 *         Descripcion:
 *           type: string
 *           description: Descripción del producto
 *         Precio:
 *           type: number
 *           description: Precio del producto
 *         Stock:
 *           type: integer
 *           description: Cantidad disponible del producto
 *     
 *     Cliente:
 *       type: object
 *       required:
 *         - Nombre
 *         - Apellido
 *         - CorreoElectronico
 *       properties:
 *         ClienteID:
 *           type: integer
 *           description: ID auto-generado del cliente
 *         Nombre:
 *           type: string
 *           description: Nombre del cliente
 *         Apellido:
 *           type: string
 *           description: Apellido del cliente
 *         CorreoElectronico:
 *           type: string
 *           description: Correo electrónico del cliente
 *     
 *     Pedido:
 *       type: object
 *       required:
 *         - ClienteID
 *         - productos
 *       properties:
 *         ClienteID:
 *           type: integer
 *           description: ID del cliente que realiza el pedido
 *         productos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productoID:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     
 *     ItemCarrito:
 *       type: object
 *       required:
 *         - usuario_id
 *         - productoID
 *         - cantidad
 *       properties:
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario
 *         productoID:
 *           type: integer
 *           description: ID del producto
 *         cantidad:
 *           type: integer
 *           description: Cantidad del producto en el carrito
 * 
 * paths:
 *   /api/pedidos:
 *     post:
 *       summary: Crear pedido
 *       tags: [Pedidos]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       responses:
 *         201:
 *           description: Pedido creado exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   mensaje:
 *                     type: string
 *                   pedidoId:
 *                     type: integer
 *     get:
 *       summary: Ver historial de pedidos
 *       tags: [Pedidos]
 *       responses:
 *         200:
 *           description: Historial de pedidos obtenido exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Pedido'
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 * 
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 * 
 * /api/carrito:
 *   post:
 *     summary: Añadir al carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCarrito'
 *     responses:
 *       201:
 *         description: Producto añadido al carrito exitosamente
 * 
 * /api/carrito/{id}:
 *   delete:
 *     summary: Eliminar del carrito
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item en el carrito
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito exitosamente
 *       404:
 *         description: Item no encontrado en el carrito
 * 
 * /api/carrito/{usuario_id}:
 *   get:
 *     summary: Obtener el contenido del carrito
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Contenido del carrito obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemCarrito'
 * 
 * /clientes:
 *   post:
 *     summary: Crear clientes
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *   get:
 *     summary: Leer clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 * 
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *   delete:
 *     summary: Eliminar Cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
