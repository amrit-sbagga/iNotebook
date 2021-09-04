const mongoose = require('mongoose');
const dbConn = require('./keys');

const mongoURI = dbConn.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully..!!");
    });
}

module.exports = connectToMongo;