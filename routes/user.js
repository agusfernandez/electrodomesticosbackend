const express = require('express');
const api = express.Router(); 
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const roleMiddleware = require('../middlewares/roleMiddleware');


api.post('/register', userController.register);
api.post('/login', userController.login);

// Rutas protegidas


api.get("/user", authenticateToken, roleMiddleware("user", "admin"), userController.getUser);


api.post('/logout', (req, res) => {
    res.clearCookie('token');  
    return res.status(200).json({ message: 'Sesión cerrada con éxito' });
  });

module.exports = api;