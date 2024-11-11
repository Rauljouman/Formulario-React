const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(express.json());
 
// Configuració de la connexió amb la base de dades MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // substitueix amb el teu usuari de MySQL
  password: 'root', // substitueix amb la teva contrasenya de MySQL
  database: 'crm', // assegura't que la base de dades 'crm' està creada
  port: 3306
});
 
db.connect((err) => {
  if (err) {
    console.error('Error connectant a la base de dades:', err);
    return;
  }
  console.log('Conectat a la base de dades MySQL');
});
 
// Rutes CRUD per a la taula 'vendes'
 
// Ruta per obtenir totes les vendes
app.get('/vendes', (req, res) => {
  db.query('SELECT * FROM vendes', (err, result) => {
    if (err) {
      console.error('Error obtenint les vendes:', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.json(result);
  });
});
 
app.post('/vendes', (req, res) => {
  const { producte, quantitat, preu, data_venda } = req.body;
  const query = 'INSERT INTO vendes (producte, quantitat, preu, data_venda) VALUES (?, ?, ?, ?)';
  db.query(query, [producte, quantitat, preu, data_venda], (err, result) => {
    if (err) {
      console.error('Error afegint una venda:', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.status(201).send('Venda afegida correctament');
  });
});
 
app.put('/vendes/:id', (req, res) => {
  const { producte, quantitat, preu, data_venda } = req.body;
  const { id } = req.params;
  const query = 'UPDATE vendes SET producte = ?, quantitat = ?, preu = ?, data_venda = ? WHERE id = ?';
  db.query(query, [producte, quantitat, preu, data_venda, id], (err, result) => {
    if (err) {
      console.error('Error actualitzant la venda:', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.send('Venda actualitzada correctament');
  });
});
 
 
// Ruta per eliminar una venda
app.delete('/vendes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM vendes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error eliminant la venda:', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.send('Venda eliminada correctament');
  });
});
 
// Posar en funcionament el servidor
app.listen(3001, () => {
  console.log('Servidor en funcionament a http://localhost:3001');
}); 
