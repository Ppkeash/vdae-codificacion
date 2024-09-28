$(document).ready(function() {
    let products = []; // Aquí cargaríamos los productos desde el servidor

    // Función para cargar los productos (simulada)
    function loadProducts() {
        // En un escenario real, esto sería una llamada AJAX al servidor
        products = [
            { id: 1, name: "Smartphone", category: "electronica", price: 500 },
            { id: 2, name: "Laptop", category: "electronica", price: 1000 },
            { id: 3, name: "Camiseta", category: "moda", price: 20 },
            { id: 4, name: "Sartén", category: "hogar", price: 30 }
        ];
        displayProducts(products);
    }

    // Función para mostrar los productos
    function displayProducts(productsToShow) {
        let productHtml = '';
        productsToShow.forEach(product => {
            productHtml += `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>Categoría: ${product.category}</p>
                    <p>Precio: $${product.price}</p>
                </div>
            `;
        });
        $('#product-container').html(productHtml);
    }

    // Evento de búsqueda
    $('#search-button, #search-input').on('click keyup', function(e) {
        if (e.type === 'click' || e.keyCode === 13) {
            let searchTerm = $('#search-input').val().toLowerCase();
            let filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        }
    });

    // Evento de filtrado
    $('#apply-filters').click(function() {
        let category = $('#category-filter').val();
        let minPrice = $('#min-price').val() ? parseFloat($('#min-price').val()) : 0;
        let maxPrice = $('#max-price').val() ? parseFloat($('#max-price').val()) : Infinity;

        let filteredProducts = products.filter(product => 
            (category === '' || product.category === category) &&
            product.price >= minPrice && product.price <= maxPrice
        );

        displayProducts(filteredProducts);
    });

    // Cargar productos al inicio
    loadProducts();
});
