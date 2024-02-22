try {
    // Utilizar el middleware 'upload' para manejar la carga de la imagen
    upload.single('imagen')(req, res, async (error) => {
        if (error) {
            console.log('Error al subir la imagen: ', error);
            return res.status(400).json({ error: "Error al cargar la imagen" });
        }
        try {
            // Obtengo el nombre de la imagen que se carga
            const nombreImagen = req.file.filename;
            // Obtengo los datos adicionales de la solicitud
            const { nombre, id_categoria } = req.body;
            // Validar datos de entrada
            if (!nombre || !id_categoria) {
                return res.status(400).json({ error: "Nombre y/o id_categoria son requeridos" });
            }
            // Ejecuto mi consulta sql
            const result = await pool.query(
                'INSERT INTO servicioscategoria (imagen_servicio,  nombre_servicio, id_categoria) VALUES (?, ?, ?)',
                [nombreImagen, nombre, id_categoria]
            );
            // Enviar una respuesta exitosa al cliente
            res.status(200).json({ message: "Servicio creada exitosamente", nombreImagen, nombre, id_categoria });
        } catch (error) {
            // console.error("Error al insertar en la base de datos:", error);
            return  res.status(500).json({ error: error.message});
        }
    });
} catch (error) {
    // console.error("Error al crear servicio:", error);
    return  res.status(500).json({ error: error.message });
}