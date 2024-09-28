# VDAE - Venta de Aparatos Electrónicos

Este repositorio contiene el proyecto formativo VDAE (Venta de Aparatos Electrónicos), una plataforma de comercio electrónico especializada en la venta de aparatos electrónicos.

## Descripción del Proyecto

VDAE es una plataforma de comercio electrónico que proporciona una interfaz de usuario intuitiva para que los clientes puedan navegar, buscar y comprar productos electrónicos. El proyecto incluye tanto el componente frontend como el backend, ofreciendo una solución completa de e-commerce.

## Tecnologías Utilizadas por ahora

- Frontend:
  - HTML
  - CSS
  - JavaScript
  - jQuery
  - Bootstrap

- Backend:
  - Node.js
  - Express.js
  - MySQL

- Herramientas:
  - Swagger para documentación de API
  - Postman para pruebas de API

## Funcionalidades Principales

- Catálogo de productos con filtros y búsqueda (en progreso)
- Carrito de compras
- Sistema de registro y login de usuarios
- API RESTful para manejar productos, carritos y pedidos

## Cambios Realizados

- Se ha implementado el módulo de integración de componentes de productos y carrito.
- Se han desarrollado y probado las siguientes APIs:
  - GET /api/productos: Listar todos los productos disponibles
  - POST /api/productos: Crear un nuevo producto
  - GET /api/productos/{id}: Obtener un producto específico
  - PUT /api/productos/{id}: Actualizar un producto existente
  - DELETE /api/productos/{id}: Eliminar un producto
  - POST /api/carrito: Añadir un producto al carrito
  - GET /api/carrito: Obtener el contenido del carrito
  - DELETE /api/carrito/{id}: Eliminar un producto del carrito
- Se ha actualizado la estructura de la base de datos para soportar productos, carrito y detalles de pedidos.
- Se ha trabajado en el diseño y desarrollo de servicios web del proyecto.
- Se ha documentado las APIs con Swagger, accesible en: [http://localhost:3001/api-docs/#/](http://localhost:3001/api-docs/#/)

## Pruebas

Se han realizado pruebas exhaustivas utilizando Postman para verificar el correcto funcionamiento de todas las APIs implementadas, incluyendo operaciones CRUD para productos y carrito.

## Próximos Pasos

- Implementar un sistema de pagos
- Mejorar la interfaz de usuario del frontend
- Añadir funcionalidades de reseñas y calificaciones de productos

## Documentación

Para más detalles sobre la implementación y uso de las APIs, consulte la documentación de Swagger en [http://localhost:3001/api-docs/#/](http://localhost:3001/api-docs/#/)

