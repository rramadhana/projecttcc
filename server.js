const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Konfigurasi koneksi ke Cloud SQL
const db = mysql.createConnection({
    host:'if-c-03:asia-southeast1:ramadhan',
    user: 'root',
    password: 'ramadhana45',
    database: 'projectakhir',
  });
  
  // Membuat koneksi ke database
  db.connect((err) => {
    if (err) {
      console.error('Koneksi ke database gagal: ', err);
    } else {
      console.log('Terhubung ke database.');
    }
  });
  
  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  
  // Read
  app.get('/', (req, res) => {
    const sqlQuery = 'SELECT * FROM user';
  
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server.');
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  app.get('/', (req, res) => {
    const userEmail = req.params.user_email;
  
    const sqlQuery = 'SELECT * FROM user WHERE user_email = ?';
    db.query(sqlQuery, userEmail, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server.');
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  
  // Create
  app.post('/', (req, res) => {
    const { user_name, user_email, user_password } = req.body;
  
    const sqlQuery = 'INSERT INTO user (user_name, user_email, user_password) VALUES (?, ?, ?)';
    db.query(sqlQuery, [user_name, user_email, user_password], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server.');
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  // Update
app.put('/', (req, res) => {
    const { user_name, user_email, user_password } = req.body;
  
    const sqlQuery = 'UPDATE user SET user_name = ?, user_password = ? WHERE user_email = ?';
    db.query(sqlQuery, [user_name, user_password, user_email], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server.');
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  
  // Delete
  app.delete('/', (req, res) => {
    const { user_id } = req.body;
  
    const sqlQuery = 'DELETE FROM user WHERE user_id = ?';
    db.query(sqlQuery, user_id, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server.');
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });
  

// Port untuk server
const port = process.env.PORT || 3001;

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berhasil berjalan pada port ${port}!`);
})

