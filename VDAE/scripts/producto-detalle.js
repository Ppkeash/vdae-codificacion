$(document).ready(function() {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Función para cargar los detalles del producto
    function cargarDetallesProducto(id) {
        $.ajax({
            url: `/api/productos/${id}`, // Cambiado a tu ruta de API existente
            method: 'GET',
            success: function(producto) {
                // Actualizar el contenido de la página con los detalles del producto
                $('#producto-detalle').html(`
                    <h1>${producto.Nombre}</h1>
                    <img src="/estilos/imgs_productos/${producto.ProductoID}.jpg" alt="${producto.Nombre}">
                    <p>Precio: $${producto.Precio}</p>
                    <p>${producto.Descripcion}</p>
                    <p>Stock disponible: ${producto.Stock}</p>
                    <button onclick="agregarAlCarrito(${producto.ProductoID})">Añadir al carrito</button>
                `);
            },
            error: function(error) {
                console.error('Error al cargar los detalles del producto:', error);
                $('#producto-detalle').html('<p>Error al cargar los detalles del producto.</p>');
            }
        });
    }

    // Cargar los detalles del producto si se proporciona un ID
    if (productId) {
        cargarDetallesProducto(productId);
    } else {
        $('#producto-detalle').html('<p>No se proporcionó un ID de producto válido.</p>');
    }
});

// Función para añadir al carrito (implementar más tarde)
function agregarAlCarrito(productId) {
    console.log('Añadir al carrito:', productId);
    // Implementar la lógica del carrito aquí
}
