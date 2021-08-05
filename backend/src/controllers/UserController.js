const bcrypt = require('bcrypt')
const { validationResult, matchedData } = require('express-validator') 

const User = require('../models/User')
const Item = require('../models/Item')
const Order = require('../models/Order')

module.exports = {
    login: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)
        
        //Validando o e-mail
        const user = await User.findOne({email: data.email})
        if(!user){
            res.json({error: 'E-mail e/ou senha errados!!'})
            return
        }

        //Validando a Senha
        const match = await bcrypt.compare(data.password, user.password)
        if(!match){
            res.json({error: 'E-mail e/ou senha errados!'})
            return
        }

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        user.token = token
        await user.save()

        res.json({token, email:data.email})

    },
    addUser: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)

        // Validando se e-mail já existe
        const user = await User.findOne({
            email: data.email
        })
        if(user){
            res.json({
                error: {email:{msg: 'E-mail já existe!'}}
            })
            return
        }

        // Criptografando a senha
        const passwordHash = await bcrypt.hash(data.password, 10)
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        // Salvando os dados do usuário
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: passwordHash,
            level: data.level,
            token
        })
        await newUser.save()
        res.json({token})
    },
    getUser: async (req, res) => {
        let token = req.body.token
        const user = await User.findOne({token})
        if(!user){
            res.json({error: 'Usuário não encontrado!'})
            return
        }

        res.json({
            name: user.name,
            password: user.password,
            level: user.level
        })
    },
    editUser: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)
        let updates = {}

        if(data.name){
            updates.name = data.name
        }
        if(data.email){
            const emailCheck = await User.findOne({email: data.email})
            if(emailCheck){
                res.json({error: 'E-mail já existente!'})
                return
            }
            updates.email = data.email
        }
        if(data.level){
            updates.level = data.level
        }
        if(data.password){
            updates.password = await bcrypt.hash(data.password,10)
        }

        //Atualiza o usuário com o token informado
        await User.findOneAndUpdate({token: data.token}, {$set: updates})
        res.json({res:'Usuário atualizado'})
    },
    delUser: async (req, res) => {
        let token = req.body.token
        await User.findOneAndRemove(token).exec()
        res.json({res:'Usuário deletado'})
    }    
}