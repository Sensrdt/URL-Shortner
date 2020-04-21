const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
        console.log(`- - - - -> Mongo Connected`)
    }catch(err){
        console.error(`Error ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;