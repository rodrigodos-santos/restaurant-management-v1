const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    level: Number,
    token: String
})

const modelName = 'User'

//Se não existir cria, se existir pega o Model atual
if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema)
}