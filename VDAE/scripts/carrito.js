$(document).ready(function() {
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            displayCartItems(cart.items);
            updateTotal(cart.total);
        } else {
            $('#lista-carrito').html('<p>El carrito está vacío.</p>');
            updateTotal(0);
        }
    }

    function displayCartItems(items) {
        const cartContainer = $('#lista-carrito');
        cartContainer.empty();
        if (items.length === 0) {
            cartContainer.html('<p>El carrito está vacío.</p>');
            return;
        }
        items.forEach(item => {
            cartContainer.append(`
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>Cantidad: <button class="decrease-qty" data-id="${item.id}">-</button> ${item.quantity} <button class="increase-qty" data-id="${item.id}">+</button></p>
                    <p>Precio: $${item.price.toFixed(2)}</p>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-id="${item.id}">Eliminar</button>
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
                // Aumentar o disminuir según el cambio
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
        updateItemQuantity(itemId, 0.5); // Aumentar de a 1
    });

    // Evento para disminuir la cantidad (de 1)
    $(document).on('click', '.decrease-qty', function() {
        const itemId = $(this).data('id');
        updateItemQuantity(itemId, -0.5);
    });

    // Evento para eliminar items del carrito
    $(document).on('click', '.remove-item', function() {
        const itemId = $(this).data('id');
        removeItem(itemId);
    });

    // Evento para proceder al pago (puedes personalizar esto según tus necesidades)
    $('.checkout').click(function() {
        alert('Procediendo al pago... (Esta funcionalidad aún no está implementada)');
    });
});
