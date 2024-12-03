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
  password: '', // Cambiar a la contraseña de tu base de datos
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

// Ruta para guardar pedidos y actualizar stock
app.post('/api/pedidos', (req, res) => {
    const { nombre, apellidos, correo, producto, cantidad } = req.body;
  
    // Comenzamos una transacción para asegurar consistencia entre el pedido y el stock
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error iniciando la transacción:', err);
        res.status(500).send('Error al procesar el pedido');
        return;
      }
  
      // Insertar el pedido en la tabla pedidos
      const insertPedidoSql = 'INSERT INTO pedidos (nombre, apellidos, correo, producto, cantidad) VALUES (?, ?, ?, ?, ?)';
      db.query(insertPedidoSql, [nombre, apellidos, correo, producto, cantidad], (err) => {
        if (err) {
          console.error('Error al insertar el pedido:', err);
          db.rollback(() => {
            res.status(500).send('Error al guardar el pedido');
          });
          return;
        }
  
        // Actualizar el stock del producto
        const updateStockSql = 'UPDATE productos SET cantidad_stock = cantidad_stock - ? WHERE nombre_producto = ? AND cantidad_stock >= ?';
        db.query(updateStockSql, [cantidad, producto, cantidad], (err) => {
          if (err) {
            console.error('Error al actualizar el stock:', err);
            db.rollback(() => {
              res.status(500).send('Stock insuficiente o error al actualizar el stock');
            });
            return;
          }
  
          // Si todo va bien, confirmamos la transacción
          db.commit((err) => {
            if (err) {
              console.error('Error al confirmar la transacción:', err);
              db.rollback(() => {
                res.status(500).send('Error al procesar el pedido');
              });
              return;
            }
  
            res.status(200).send('Pedido guardado y stock actualizado exitosamente');
          });
        });
      });
    });
  });
  


// Ruta para obtener pedidos
app.get('/api/pedidos/obtener', (req, res) => {
  const sql = 'SELECT * FROM pedidos';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error ejecutando la consulta:', err.message);
          res.status(500).send('Error al obtener los pedidos');
          return;
      }
      res.status(200).json(result);
  });
});


// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT nombre_producto, descripcion, precio, cantidad_stock FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener los productos');
    } else {
      res.json(results); // Asegúrate de que cada producto tenga el campo "nombre_producto"
    }
  });
});

// Ruta para sumar stock
app.post('/api/productos/sumar', (req, res) => {
    const { nombre_producto, cantidad } = req.body;
    console.log('Sumar stock:', nombre_producto, cantidad); // Para depuración

  
    const sql = 'UPDATE productos SET cantidad_stock = cantidad_stock + ? WHERE nombre_producto = ?';
    db.query(sql, [cantidad, nombre_producto], (err, result) => {
      if (err) {
        console.error('Error al actualizar el stock:', err);
        res.status(500).send('Error al actualizar el stock');
        return;
      }
      res.status(200).send('Stock actualizado exitosamente');
    });
  });
  
  // Ruta para restar stock
  app.post('/api/productos/restar', (req, res) => {
    const { nombre_producto, cantidad } = req.body;
    console.log('Restar stock:', nombre_producto, cantidad); // Para depuración

  
    const sql = 'UPDATE productos SET cantidad_stock = cantidad_stock - ? WHERE nombre_producto = ?';
    db.query(sql, [cantidad, nombre_producto], (err, result) => {
      if (err) {
        console.error('Error al actualizar el stock:', err);
        res.status(500).send('Error al actualizar el stock');
        return;
      }
      res.status(200).send('Stock actualizado exitosamente');
    });
  });
  
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
