const swaggerJSDoc = require("swagger-jsdoc");

const swaggerui = require('swagger-ui-express')

// Metadata sobre la informacion de la API
const option={
    definition: {
        openapi: "3.0.0",
        info:{
            title:"API Documentation we StarUp V1 - developed by EfraDEV", version: "1.0.0"
        }
    },
    apis:["../servicio.routes.js"],
};

// DOCUMENTAACION
const swaggerSpec = swaggerJSDoc(option);

// Funciom para la interfaz
const swaggerDocs = (app, port) =>{
    app.use('/api/v1/docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
    app.get('/api/v1/docs.js', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });
    console.log(`Api funcionando en: http://localhost:${port}/api/v1/docs/`)
}

module.exports= swaggerDocs;