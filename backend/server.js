require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')

const apiRoutes = require('./src/routes')

// Conexão com o Banco de Dados
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (error) => {
    console.log("Erro: ", error.message)
})

// Criação do Servidor
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(fileupload())

// Acessar informações da pasta public no servidor
server.use(express.static(__dirname+'/public')) 

server.use('/', apiRoutes)

server.listen(process.env.PORT, ()=> {
    console.log(` - Rodando no endereço: ${process.env.BASE}`)
})