const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true, unique: true}
    
})

//configuracion del bycript

userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next;
    }

    try {
        const hashpassword = await bcrypt.hash(this.password, 12);
        user.password = hashpassword;
        next();

    } catch(error){
        return next(error);
    }

})

const User = mongoose.model('user', userSchema);

module.exports= User;


