// Usar multer para el manejo de files
const multer = require('multer');
const path = require('path')
// REDIMENSION DE IMAGENES
// const sharp = require('sharp');

const pool = require('../db');
const { error } = require('console');

// Donde almaceno

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        // extension del archivo
        const ext = file.originalname.split('.').pop(); //ME RETORNA LA EXTENSION DE UNA IMAGEN POR EJEMPLO .png
        cb(null, `${Date.now()}.${ext}`)
    }
});

// Creo un midelware
const upload = multer({ storage: storage });
// Periciones get
const getCategoria = async (req, res) => {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM categorias");
        // console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        // console.log("Error: ", error);
        return res.status(500).json({ error: error.message });
    }
};
const getServicios = async (req, res) => {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM servicioscategoria");
        // console.log(rows, fields);
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se han encontrado servicios" });

        }
        res.status(200).json(rows);
    } catch (errror) {
        // console.log("Error: ", error);
        return res.status(500).json({ error: error.message });
    }
}
const getServicioConID = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM servicioscategoria WHERE id_servicio  = ${id}`);
        // console.log(rows);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.status(200).json(rows);
    } catch (error) {
        // console.log("Error: ", error);
        return res.status(500).json({ error: error.message })
    }
}

// crear una categoría
const createCatergoriaServicio = async (req, res) => {

    try {
        const { nombre } = req.body;
        // Ejecuto mi consulta sql
        if (!nombre) {
            return res.status(400).json({ error: "El nombre de la categoria es obligatorio" })
        }
        const result = await pool.query(
            'INSERT INTO categorias (nombre_categoria) VALUES (?)',
            [nombre]
        );
        // Enviar una respuesta exitosa al cliente
        res.status(200).json({ message: "Servicio creado exitosamente", nombre });
    } catch (error) {
        // console.error("Error al insertar en la base de datos:", error);
        return res.status(500).json({ error: error.message });
    }
};

// crear un servicio en específico
const crearServicio = async (req, res) => {
    console.log("Entro a la funcion crearServicio");
    console.log(req.body);
    try {
        console.log("Entro al primer trycatch");

        // Utilizar el middleware 'upload' para manejar la carga de la imagen
        upload.single('imagen')(req, res, async (error) => {
            console.log("Procesando la carga de la imagen");

            // Verificar si hay un error en la carga de la imagen
            if (error) {
                console.log('Error al subir la imagen: ', error);
                return res.status(400).json({ error: "Error al cargar la imagen" });
            }

            // Obtener el nombre de la imagen cargada
            const nombreImagen = req.file ? req.file.filename : null;
            console.log("Nombre de la imagen: ", nombreImagen);

            try {
                // Obtener los datos del formulario
                const { nombre, id_categoria } = req.body;
                if (!nombre || !id_categoria) {
                    return res.status(400).json({ error: "Nombre y/o id_categoria son requeridos" });
                }

                // Insertar el servicio en la base de datos
                console.log("Nombre de la imagen: ", nombreImagen);
                const result = await pool.query(
                    'INSERT INTO servicioscategoria (imagen_servicio, nombre_servicio, id_categoria) VALUES (?, ?, ?)',
                    [nombreImagen, nombre, id_categoria]
                );
                console.log("Servicio creado correctamente");
                res.status(200).json({ message: "Servicio creado exitosamente", nombreImagen, nombre, id_categoria });
            } catch (error) {
                console.error("Error al insertar en la base de datos:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    } catch (error) {
        console.error("Error al procesar la carga de archivos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}




const updateServicio = async (req, res) => {
    const id = req.params.id;

    try {
        upload.single('imagen')(req, res, async (error) => {
            if (error) {
                console.log("Error al subir la imagen: ", error);
                return res.status(400).json({ error: "Error al cargar la imagen" });
            }
            try {
                const nombreImagen = req.file.filename;
                const { nombre, id_categoria } = req.body;
                if (!nombre || !id_categoria) {
                    return res.status(400).json({ error: "Nombre y/o id_categoria son requeridos" });
                }
                // CONSULTA ACÁ
                const result = await pool.query(`UPDATE servicioscategoria SET nombre_servicio =?, imagen_servicio = ?, id_categoria = ? WHERE id_servicio = ?`, [nombre, nombreImagen, id_categoria, id]);
                return res.sendStatus(204);
            } catch (error) {
                console.log("Error:", error)
                return res.status(500).json({ error: error.message })
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// Eliminar un servicio en específico
const deleteServicio = async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.query(`DELETE FROM servicioscategoria  WHERE id_servicio = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        return res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}
module.exports = { getCategoria, getServicios, crearServicio, getServicioConID, createCatergoriaServicio, updateServicio, deleteServicio };