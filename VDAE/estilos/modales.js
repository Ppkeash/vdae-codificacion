/*<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Obtener el modal
        var modal = document.getElementById("productoModal");

        // Obtener el botón que abre el modal
        var btns = document.querySelectorAll(".ver-detalles");

        // Obtener el elemento <span> que cierra el modal
        var span = document.getElementsByClassName("close")[0];

        // Cuando el usuario hace clic en el botón, abre el modal 
        btns.forEach(function(btn) {
            btn.onclick = function() {
                modal.style.display = "block";
            }
        });

        // Cuando el usuario hace clic en <span> (x), cierra el modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // Cuando el usuario hace clic fuera del modal, lo cierra
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
       });
</script>

MODELO BASE DE DEL FRONT DE MODELOS*/