const express = require('express');
const api = express.Router(); 
const upload = require('../libs/storage');

const {addProducto, getProductos, findProductos, updateProductos, deleteProductos} = require('../controllers/productController');

api.get('/productos', getProductos);
api.get('/productos/:id', findProductos);
api.post('/productos', upload.single('imagen'), addProducto);
api.put('/productos/:id', upload.single('imagen'), updateProductos);
api.delete('/productos/:id', deleteProductos);

module.exports = api; 