const mongoose = require ('mongoose');
const {appConfig} = require('../config');

const productosSchema = new mongoose.Schema({
        nombre: String,
        marca: String,
        descripcion: String,
        precio: Number,
        imagen: String,
        categoria: String,
        estado: String,
        stock: Number
    },{
        timestamps: true
        
    }

)

// config de las imagenes

productosSchema.methods.setImage = function setImagen (filename){
    const {host, port} = appConfig;
    this.imagen = `${host}:${port}/public/${filename}`;
}

const Productos = mongoose.model('productos', productosSchema);

module.exports= Productos;  
