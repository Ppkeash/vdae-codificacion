document.addEventListener("DOMContentLoaded", function() {
    // Referencias al DOM
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    // Cargar productos desde el localStorage
    cargarCarrito();

    // Función para cargar productos del carrito
    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = 0;

        carrito.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('cart-item');
            productoElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <input type="number" value="${producto.cantidad}" min="1" data-id="${producto.id}">
                <button class="remove-from-cart" data-id="${producto.id}">Eliminar</button>
            `;
            listaCarrito.appendChild(productoElement);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

        // Añadir eventos a los botones
        agregarEventos();
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(id) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        recargarCarrito();
    }

    // Función para recargar el carrito después de una modificación
    function recargarCarrito() {
        listaCarrito.innerHTML = '';
        cargarCarrito();
    }

    // Función para añadir eventos a los botones de eliminar y cambiar cantidad
    function agregarEventos() {
        const botonesEliminar = document.querySelectorAll('.remove-from-cart');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', function() {
                const id = boton.getAttribute('data-id');
                eliminarProducto(id);
            });
        });

        const inputsCantidad = document.querySelectorAll('.cart-item input[type="number"]');
        inputsCantidad.forEach(input => {
            input.addEventListener('change', function() {
                const id = input.getAttribute('data-id');
                cambiarCantidad(id, input.value);
            });
        });
    }

    // Función para cambiar la cantidad de un producto en el carrito
    function cambiarCantidad(id, cantidad) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.map(producto => {
            if (producto.id === id) {
                producto.cantidad = parseInt(cantidad);
            }
            return producto;
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        recargarCarrito();
    }
});
