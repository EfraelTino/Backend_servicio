const {Router} = require('express');
const router = Router();
const {getCategoria, getServicios,  getServicioConID, createCatergoriaServicio, updateServicio, deleteServicio, crearServicio} = require('../controllers/servicios.controller.js');


// acá crearemos todas las rutas


// acceder a todos los servicios
router.get('/servicio', getServicios);
// acceder a un servicio en específico
router.get('/servicio/:id', getServicioConID)

router.get('/crear-categoria', createCatergoriaServicio);



// acceder a las categorias
router.get('/categoria', getCategoria)
// crear una categoria de servicio
// router.post('/categoria', createCatergoriaServicio)


// crear un servicio en específico
router.post('/crear_servicio/', crearServicio);

router.put('/servicio/:id', updateServicio)

// Eliminar un servicio
router.delete('/servicio/:id', deleteServicio)

module.exports = router;    