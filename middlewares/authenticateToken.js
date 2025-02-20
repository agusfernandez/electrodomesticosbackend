const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    //const authHeader = req.headers('authentication');
    //const authHeader = req.headers['authorization'];

    //const  token = authHeader && authHeader.split(' ')[1];
    const token = req.header("Authorization")?.replace("Bearer ", "");


    if(!token) {
        return res.status(401).json({error: 'Acceso Denegado. No se proporcionó token de autenticación'});
    }

    try {
        const secretKey = process.env.SECRET_KEY  || 'secret_key';
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
        } catch (error) {
        
        console.log('error al verificar el token', error);
        res.status(403).json( {message: 'Token invalido'});
    }
}

module.exports = authenticateToken;