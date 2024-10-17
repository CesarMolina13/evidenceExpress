const express = require('express')
const app = express()
const port = 3002
const mysql = require('mysql2/promise');

// Cracion conexión con base de datos
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'eviexpress',
});
// ruta get inicial
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// ruta para login 
app.get('/login', async (req, res) => {
  const datos = req.query;

  // consulta SELECT query
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `nombre` = ? AND `contraseña` = ?",
      [datos.usuario, datos.clave]
    );

    // validacion 
    if (results.length > 0) {
      res.status(200).send('Inicio de sesión correcto');
    } else {
      res.status(401).send('Datos de inicio incorrectos');
    }

  } catch (err) {
    // Manejo de errores
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/validar', (req, res) => {
  res.send('validacion de sesion')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})