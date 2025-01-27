const express = require('express');
const api = express.Router(); 
const userController = require('../controllers/userController');

api.post('/register', userController.register);
api.post('/login', userController.login);
api.get('/user', userController.getUser);
api.delete('/user/:userId', userController.deleteUser);

api.post('/logout', (req, res) => {
    res.clearCookie('token');  // Si guardas el token en una cookie
    return res.status(200).json({ message: 'Sesión cerrada con éxito' });
  });

module.exports = api;