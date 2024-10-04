// busqueda.js
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('searchResults');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('searchQuery').value;
        const categoria = document.getElementById('categoryFilter').value;
        const minPrecio = document.getElementById('minPrice').value;
        const maxPrecio = document.getElementById('maxPrice').value;

        try {
            const response = await fetch(`/api/productos/buscar?query=${query}&categoria=${categoria}&minPrecio=${minPrecio}&maxPrecio=${maxPrecio}`);
            const productos = await response.json();
            displayResults(productos);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            resultsContainer.innerHTML = '<p>Error al realizar la búsqueda. Por favor, intenta de nuevo.</p>';
        }
    });

    function displayResults(productos) {
        resultsContainer.innerHTML = '';
        if (productos.length === 0) {
            resultsContainer.innerHTML = '<p>No se encontraron productos que coincidan con la búsqueda.</p>';
            return;
        }

        const ul = document.createElement('ul');
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${producto.Nombre}</h3>
                <p>Precio: $${producto.Precio}</p>
                <p>Descripción: ${producto.Descripcion}</p>
            `;
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    }
});
