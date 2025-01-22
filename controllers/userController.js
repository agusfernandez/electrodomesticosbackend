const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    async register(req, res) {
        const { name, email, password, username } = req.body;
        try {
            console.log('Antes de crear el user', { name, email, password, username });

            if(!name || !email || !password || !username) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios'});
            }

            //Guardar el nuevo user
            const user = new User({ name, email, password, username });
            await user.save();
            res.status(200).json({ message: 'User creado con exito' });


        } catch (error) {
            console.log('Error al crear el user', error);
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {

            // Buscar el usaurio ingresado

            console.log('Antes de buscar al user', {email});
            const user = await User.findOne({email});
            console.log('usuario encontrado', user);

            if(!user) {
                console.log('usuario no encontrado');
                return res.status(400).json({ message: 'Email o contraseña incorrectos'});
            }

            // una vez encontrado el usar - verificar contraseña comprando (usar bycript)
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log('contraseña correcta', isValidPassword);
            if(!isValidPassword) {
                console.log('contraseña incorrecta', isValidPassword);
                return res.status(400).json({ message: 'Contraseña incorrectos'});
            }

            // Generar el token para que la contraseña este encriptada

            const secretKey = process.env.SECRET_KEY || 'defaultsecret';
            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h'})
            console.log('token generado', token);
            console.log('inicio de sesion exitoso para el usaurio', user);

            
            res.status(200).json({ token });
            
            
        } catch(error){
            console.log('Error al iniciar sesion', error);
        }
    },

    async getUser(req,res) {
        try {
            const users = await User.find();
            console.log(users);
            res.status(200).send({message: 'usuarios encontrados', users});

        } catch (error) {
            console.log('Error al obtener usuarios', error);
            res.status(500).send({message: error.message});

        }
    }

}

module.exports = userController;  