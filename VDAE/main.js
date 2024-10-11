// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    hamburgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

    // Aquí puedes agregar más funcionalidades como:
    // - Cargar productos dinámicamente
    // - Manejar la búsqueda de productos
    // - Aplicar filtros
    // - Añadir productos al carrito
});
    