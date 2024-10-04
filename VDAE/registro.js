$(document).ready(function() {
    const registroForm = $('#registroForm');
    const registrarButton = $('#registrarButton');
    const mensajeError = $('#mensajeError');
    const mensajeExito = $('#mensajeExito');

    registroForm.on('submit', function(e) {
        e.preventDefault();
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const email = $('#correoElectronico').val();
        const password = $('#contraseña').val();
        const terminos = $('#terminos').is(':checked');

        if (!terminos) {
            mostrarError('Debes aceptar los términos y condiciones para registrarte.');
            return;
        }

        // Deshabilitar el botón mientras se procesa la solicitud
        registrarButton.prop('disabled', true);

        // Realizar la solicitud de registro al servidor
        $.ajax({
            url: '/api/registro',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, apellido, email, password }),
            success: function(response) {
                console.log('Registro exitoso:', response);
                mostrarExito('Registro exitoso, por favor verifica tu email.');
                // Redirigir a la página de inicio de sesión después de 3 segundos
                setTimeout(() => {
                    window.location.href = '/html/login.html';
                }, 3000);
            },
            error: function(xhr, status, error) {
                const errorMessage = xhr.responseJSON?.message || 'Ha ocurrido un error en el registro.';
                mostrarError(errorMessage);
                // Habilitar el botón nuevamente
                registrarButton.prop('disabled', false);
            }
        });
    });

    function mostrarError(mensaje) {
        mensajeError.text(mensaje).show();
        mensajeExito.hide();
    }

    function mostrarExito(mensaje) {
        mensajeExito.text(mensaje).show();
        mensajeError.hide();
    }

    // Validación en tiempo real
    $('#nombre, #apellido, #correoElectronico, #contraseña, #terminos').on('input change', function() {
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const email = $('#correoElectronico').val();
        const password = $('#contraseña').val();
        const terminos = $('#terminos').is(':checked');

        registrarButton.prop('disabled', !(nombre && apellido && email && password && terminos));
    });
});