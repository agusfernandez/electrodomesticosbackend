const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    async register(req, res) {
        const { nombre, email, password, username } = req.body;
        try {
            console.log('Antes de crear el usuario', { nombre, email, password, username });

            if (!nombre || !email || !password || !username) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            // Guardar el nuevo usuario
            const user = new User({ nombre, email, password, username });
            await user.save();
            res.status(200).json({ message: 'Usuario creado con éxito' });

        } catch (error) {
            console.error('Error al crear el usuario:', error);

            // Manejo del error de duplicado (MongoDB code 11000)
            if (error.code === 11000) {
                const duplicatedField = Object.keys(error.keyValue || error.keyPattern || {})[0]; // Detectar el campo duplicado
                if (duplicatedField === 'email') {
                    return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
                }
                if (duplicatedField === 'username') {
                    return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
                }
            }

            // Otros errores genéricos
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Email o contraseña incorrectos' });
            }
    
            // Verificar contraseña
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }
    
            // Generar token
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'defaultsecret', { expiresIn: '1h' });
    
            // Enviar el token al frontend
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    async getUser(req, res) {
        try {
          // Obtener token de la cabecera Authorization
          const token = req.header('Authorization').replace('Bearer ', '');
          if (!token) {
            return res.status(401).json({ message: 'No token provided' });
          }
    
          // Verificar token
          const decoded = jwt.verify(token, process.env.SECRET_KEY || 'defaultsecret');
          const user = await User.findById(decoded.id);
    
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
    
          // Retornar solo los datos necesarios del usuario
          res.status(200).json({ user });
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          res.status(500).json({ message: 'Error interno del servidor' });
        }
      },
        
};



module.exports = userController;
