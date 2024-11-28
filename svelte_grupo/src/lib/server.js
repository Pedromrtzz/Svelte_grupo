const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambiar si no usas localhost
    user: 'root', // Cambiar al usuario de tu base de datos
    password: 'PEDRO2843', // Cambiar a la contraseña de tu base de datos
    database: 'svelte', // Cambiar al nombre de tu base de datos
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para guardar pedidos
app.post('/api/pedidos', (req, res) => {
    const { nombre, apellidos, correo, producto } = req.body;

    const sql = 'INSERT INTO pedidos (nombre, apellidos, correo, producto) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellidos, correo, producto], (err, result) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).send('Error al guardar el pedido');
            return;
        }
        res.status(200).send('Pedido guardado exitosamente');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
