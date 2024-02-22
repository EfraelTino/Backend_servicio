const {Router} = require('express');
const {pool} = require('../db.js');

const router = Router();

router.get('/ping', async(req,res)=>{

    // es como decir crea una columna 1+1 y guardalo en result
   const {rows} = await pool.query('SELECT 1 + 1 as result');

    // extraer datos

    console.log(rows)
   res.json('ping')
})
module.exports = router;