const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PingSchema=new Schema({
    data: { 
        type:Number 
    }
})

const Ping=mongoose.model('Ping',PingSchema);

module.exports = Ping;
