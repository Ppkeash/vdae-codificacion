# VDAE - Sistema de Venta y Distribución de Artículos Electrónicos

## Descripción del Proyecto

VDAE (Venta y Distribución de Artículos Electrónicos) es un sistema integral diseñado para gestionar la venta en línea de productos electrónicos. Este proyecto abarca desde el desarrollo del backend hasta la implementación de pruebas exhaustivas, asegurando un producto robusto y de alta calidad.

## Características Principales

- Catálogo de productos electrónicos
- Sistema de búsqueda avanzada con filtros
- Carrito de compras
- Gestión de usuarios y autenticación
- Barra de busqueda para los productos

## Tecnologías Utilizadas

- Backend: Node.js con Express.js
- Frontend: JavaScript, CSS y HTML
- Base de Datos: MySQL


## Instalación y Configuración

1. Clonar el repositorio:
   ```
   git clone https://github.com/tu-usuario/vdae.git
   cd vdae
   ```

2. Instalar dependencias:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Configurar variables de entorno:
   - Crear archivos `.env` en las carpetas `backend` y `frontend` siguiendo el ejemplo de `.env.example`.

4. Iniciar el servidor de desarrollo:
   ```
   # En la carpeta backend
   npm run dev

   # En la carpeta frontend
   npm start
   ```


## Casos de Prueba

Se han desarrollado casos de prueba exhaustivos para asegurar la calidad del sistema. Algunos de los casos de prueba clave incluyen:

- CP-001: Registro de usuario
- CP-002: Inicio de sesión
- CP-003: Visualización del catálogo de productos
- CP-004: Añadir al carrito
- CP-005: Búsqueda de productos

Para más detalles, consulta la carpeta `docs/TestCases/`.

