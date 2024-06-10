// Actualización
const updateQuery = 'UPDATE contacto SET nombre=?, correoElectronico=?, telefono=?, mensaje=? WHERE ContactoID=?';
const updateValues = ['Nuevo Nombre', 'nuevo_correo@example.com', '0987654321', 'Nuevo mensaje', 1];

connection.query(updateQuery, updateValues, (err, result) => {
    if (err) {
        console.error('Error al actualizar en la base de datos:', err);
        return;
    }
    console.log('Contacto actualizado exitosamente:', result);
});
