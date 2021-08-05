const { validationResult, matchedData } = require('express-validator') 

const Client = require('../models/Client')

module.exports = {
    addClient: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)

        // Validando se e-mail já existe
        const user = await Client.findOne({
            email: data.email
        })
        if(user){
            res.json({error: {email:{msg: 'E-mail já existe!'}}})
            return
        }

        // Salvando os dados do usuário
        const newClient = new Client({
            name: data.name,
            email: data.email,
            phone: data.phone
        })
        await newClient.save()
        res.json({msg: 'Cliente adicionado!'})
    },
    getClient: async (req, res) => {
        let email = req.body.email
        const client = await Client.findOne({email})

        res.json({
            name: client.name,
            email: client.email,
            phone: client.phone
        })
    },
    editClient: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)
        const id = await Client.findById(data.id)
        let updates = {}

        if(data.name){
            updates.name = data.name
        }
        if(data.email){
            const emailCheck = await Client.findOne({email: data.email})
            if(emailCheck){
                res.json({error: 'E-mail já existente!'})
                return
            }
            updates.email = data.email
        }
        if(data.phone){
            updates.phone = data.phone
        }

        //Atualiza o usuário com o id informado
        await Client.findOneAndUpdate({id}, {$set: updates})
        res.json({res:'Cliente atualizado'})
    },
    delClient: async (req, res) => {
        let email = req.body.email
        await Client.findOneAndRemove(email).exec()
        res.json({res:'Cliente deletado!'})
    }
} 