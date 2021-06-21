const mongoose = require('mongoose')

const ConvarsationSchema= new mongoose.Schema({
    members:{
        type:Array
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Convarsation',ConvarsationSchema)