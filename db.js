const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "todistas"
});
pool.getConnection((err, con) =>{
    if(err){
        console.error("Error en la conexion ala base de datos", err)
    }else{
        console.log("Conexion exitosa")
    }
})
module.exports = pool;
