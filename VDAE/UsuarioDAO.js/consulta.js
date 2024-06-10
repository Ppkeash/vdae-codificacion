// Consulta
const selectQuery = 'SELECT * FROM contacto';

connection.query(selectQuery, (err, results) => {
    if (err) {
        console.error('Error al consultar la base de datos:', err);
        return;
    }
    console.log('Contactos:', results);
});
