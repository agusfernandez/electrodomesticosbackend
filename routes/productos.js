const express = require('express');
const api = express.Router(); 
const upload = require('../libs/storage');
const authenticateToken = require('../middlewares/authenticateToken');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {addProducto, getProductos, findProductos, updateProductos, deleteProductos} = require('../controllers/productController');

api.get('/productos', getProductos);
api.get('/productos/:id', findProductos);
//Rutas protegidas para el administrador
api.post('/productos', authenticateToken, roleMiddleware('admin'), upload.single('imagen'), addProducto);
api.put('/productos/:id',authenticateToken, roleMiddleware('admin'), upload.single('imagen'), updateProductos);
api.delete('/productos/:id',authenticateToken, roleMiddleware('admin'), deleteProductos);

module.exports = api; 