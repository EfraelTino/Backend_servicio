const express = require('express');
const cors = require('cors');
const PORT = require('./config.js');
const indexRoutes = require('./routes/index.routes.js')
const servicioRoute = require('./routes/servicio.routes.js');
const path = require('path');
// const swaggerDocs = require('./routes/swager.js'); 

const app = express();
// antes de que llegue al backend todos los request se deberan de convertir en json
// habilito los cors
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use('/uploads', express.static(path.join(__dirname, './uploads/')));
app.use(servicioRoute);

// swagger

app.listen(PORT, () => {
    console.log(`The use server in the port ${PORT}`);
    // swaggerDocs(app, PORT)
})