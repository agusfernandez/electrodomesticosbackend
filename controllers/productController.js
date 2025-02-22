const Producto = require('../models/Productos');


async function addProducto(req, res) {
    try {
        const { nombre, marca, descripcion, precio, categoria, estado, stock } = req.body;
        
        const producto = new Producto({
            nombre,
            marca,
            descripcion,
            precio,
            categoria,
            estado,
            stock
        });

        if (req.file) {
            const imageUrl = `http://localhost:8081/public/${req.file.filename}`;
            producto.imagen = imageUrl; 
        }

        const productos = await producto.save();  // Guarda el producto en la base de datos
        res.status(200).send({ productos });

    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log('Error al crear el producto', error);
    }
}

async function getProductos(req,res){
    try {

        const productos = await Producto.find();
        res.status(200).send({message: 'Productos encontrados', productos});

    } catch(error){
        res.status(500).send({message: error.message});
        console.log(error);
    }
}

async function findProductos(req,res){
    try { 
       const productos = await Producto.findById(req.params.id);
       res.status(200).send({message: 'Producto encontrado por id', productos});

    } catch(error){
        res.status(500).send({message: error.message});

    }
}

async function updateProductos(req,res){
    try { 
        
        if (req.file) {
            req.body.imagen = `http://localhost:8081/public/${req.file.filename}`;
        }

        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send({message: 'Producto actualizado', producto});

    } catch(error){
        res.status(500).send({message: error.message});
    }
}

async function deleteProductos(req,res){
    try { 
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if(!producto){
            res.status(404).send({message: 'Producto no encontrado'});
        }

        res.status(200).send({message: 'Producto eliminado', producto});    

    } catch(error){
        res.status(500).send({message: error.message});
    }
}

module.exports = {addProducto, getProductos, findProductos, updateProductos, deleteProductos};  //exportando la función para que pueda ser utilizada en otros archivos.