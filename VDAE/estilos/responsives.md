/* responsive.css */

/* Estilos generales para todos los tamaños de pantalla */
body {
    font-size: 16px;
    line-height: 1.5;
}

    img {
    max-width: 10%;
    height: auto;
}

@media (max-width: 768px) {
    img {
        max-width: 20%;
    }
}

@media (max-width: 480px) {
    img {
        max-width: 30%;
    }
}


/* Pantallas medianas (tablets) */
@media screen and (max-width: 768px) {
    header {
        flex-direction: column;
        align-items: center;
    }

    nav {
        width: 100%;
        margin-top: 1rem;
    }

    nav ul {
        flex-direction: column;
        align-items: center;
    }

    nav ul li {
        margin: 0.5rem 0;
    }

    .search-cart {
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
    }

    .banner-text h1 {
        font-size: 1.8rem;
    }

    .banner-text p {
        font-size: 1rem;
    }

    .tarjeta-producto {
        width: calc(50% - 20px);
    }
}

/* Pantallas pequeñas (smartphones) */
@media screen and (max-width: 480px) {
    .logo img {
        max-height: 40px;
    }

    .search-container {
        width: 100%;
    }

    #search-input {
        width: calc(100% - 40px);
    }

    .banner-text h1 {
        font-size: 1.5rem;
    }

    .banner-text p {
        font-size: 0.9rem;
    }

    .tarjeta-producto {
        width: 100%;
    }

    .filtro-busqueda {
        flex-direction: column;
    }

    .filtro-busqueda select,
    .filtro-busqueda input,
    .filtro-busqueda button {
        width: 100%;
        margin-bottom: 0.5rem;
    }
}

/* Ajustes para pantallas muy pequeñas */
@media screen and (max-width: 320px) {
    body {
        font-size: 14px;
    }

    .banner-text h1 {
        font-size: 1.2rem;
    }

    .banner-text p {
        font-size: 0.8rem;
    }
}

/* Ajustes para pantallas grandes */
@media screen and (min-width: 1200px) {
    .container {
        max-width: 1140px;
        margin: 0 auto;
    }

    .tarjeta-producto {
        width: calc(25% - 20px);
    }
}

