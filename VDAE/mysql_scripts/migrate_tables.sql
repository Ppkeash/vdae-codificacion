-- Crear tabla carrito
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    productoID INT,
    cantidad INT
);

-- Crear tabla clientes
CREATE TABLE IF NOT EXISTS clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    CorreoElectronico VARCHAR(255),
    Contraseña VARCHAR(255)
);

-- Crear tabla contacto
CREATE TABLE IF NOT EXISTS contacto (
    ContactoID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    CorreoElectronico VARCHAR(255),
    Mensaje TEXT,
    Telefono VARCHAR(20)
);

-- Crear tabla detalles_pedido
CREATE TABLE IF NOT EXISTS detalles_pedido (
    DetalleID INT AUTO_INCREMENT PRIMARY KEY,
    PedidoID INT,
    ProductoID INT,
    Cantidad INT
);

-- Crear tabla pagina
CREATE TABLE IF NOT EXISTS pagina (
    PaginaID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion TEXT,
    URL VARCHAR(255)
);

-- Crear tabla pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    Fecha DATE,
    Total DECIMAL(10, 2)
);

-- Crear tabla productos
CREATE TABLE IF NOT EXISTS productos (
    ProductoID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion TEXT,
    Precio DECIMAL(10, 2),
    Stock INT
);

-- Agregar claves foráneas
ALTER TABLE carrito
ADD FOREIGN KEY (productoID) REFERENCES productos(ProductoID);

ALTER TABLE detalles_pedido
ADD FOREIGN KEY (PedidoID) REFERENCES pedidos(PedidoID),
ADD FOREIGN KEY (ProductoID) REFERENCES productos(ProductoID);

ALTER TABLE pedidos
ADD FOREIGN KEY (ClienteID) REFERENCES clientes(ClienteID);
