const mongoose = require('mongoose');

mongoose.connection.on("open", () => console.log("Base de Datos Conectada"));

async function connectDb({ host, port, dbName}) {
    const uri = `mongodb://${host}:${port}/${dbName}`;
    await mongoose.connect(uri, {useNewUrlParser: true});
}

module.exports = connectDb;