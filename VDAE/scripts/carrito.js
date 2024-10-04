$(document).ready(function() {
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            displayCartItems(cart.items);
            updateTotal(cart.total);
        } else {
            $('#lista-carrito').html('<p class="col-12 text-center">El carrito está vacío.</p>');
            updateTotal(0);
        }
    }

    function displayCartItems(items) {
        const cartContainer = $('#lista-carrito');
        cartContainer.empty();
        if (items.length === 0) {
            cartContainer.html('<p class="col-12 text-center">El carrito está vacío.</p>');
            return;
        }
        items.forEach(item => {
            cartContainer.append(`
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">
                                Cantidad: 
                                <button class="btn btn-sm btn-outline-secondary decrease-qty" data-id="${item.id}">-</button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary increase-qty" data-id="${item.id}">+</button>
                            </p>
                            <p class="card-text">Precio: $${item.price.toFixed(2)}</p>
                            <p class="card-text">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                            <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    function updateTotal(total) {
        $('#total-carrito').text(`Total: $${total.toFixed(2)}`);
    }

    function updateItemQuantity(itemId, change) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            const item = cart.items.find(item => item.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeItem(itemId);
                } else {
                    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    loadCart();
                }
            }
        }
    }

    function removeItem(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            cart.items = cart.items.filter(item => item.id !== itemId);
            cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    }

    // Cargar el carrito al iniciar la página
    loadCart();

    // Evento para aumentar la cantidad (de a 1)
    $(document).on('click', '.increase-qty', function() {
        const itemId = $(this).data('id');
        updateItemQuantity(itemId, 1);
    });

    // Evento para disminuir la cantidad (de a 1)
    $(document).on('click', '.decrease-qty', function() {
        const itemId = $(this).data('id');
        updateItemQuantity(itemId, -1);
    });

    // Evento para eliminar items del carrito
    $(document).on('click', '.remove-item', function() {
        const itemId = $(this).data('id');
        removeItem(itemId);
    });

    // Evento para proceder al pago
    $('.checkout').click(function() {
        alert('Procediendo al pago... (Esta funcionalidad aún no está implementada)');
    });
});
