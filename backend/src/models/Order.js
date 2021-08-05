const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    idClient: String,
    table: Number,
    statusOrder: String,
    date: Date,
    serviceTable: Boolean,
    items:[],
    total: Number
})

const modelName = 'Order'

//Se não existir cria, se existir pega o Model atual
if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema)
}