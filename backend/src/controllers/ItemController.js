const { validationResult, matchedData } = require('express-validator') 
const { v4: uuid } = require('uuid') //numero aleatório
const jimp = require('jimp') //tratamento de imagem
const mongoose = require('mongoose')

const Category = require('../models/Category')
const User = require('../models/User')
const Item = require('../models/Item')

const addImage = async (buffer) => {
    let newName = `${uuid()}.jpg`
    let tmpImg = await jimp.read(buffer)
    tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`)
    return newName
}

module.exports = {
    getCategories: async (req, res) => {
        //Pegar todas categorias
        const cats = await Category.find()

        let categories = []

        //Adicionar avatar as categorias, itera uma por uma adicionando a img
        for(let i in cats){
            categories.push({
                ...cats[i]._doc,//pega apenas o item
                img: `${process.env.BASE}/assets/images/categories/${cats[i].slug}.png`
            })
        }
        res.json({categories})
    },
    addItem: async (req, res) => {
        let { name, price, desc, cat, token} = req.body
        const user = await User.findOne({token}).exec()
        if(!user){
            res.json({error:'usuário não encontrado'})
            return
        }
        const idCat = await Category.findOne({'slug': cat}).exec()
        if(!idCat){
            res.json({error:'categoria não encontrada'})
            return
        }

        if(!name || !cat){
            res.json({error: 'Nome e/ou categoria não preenchidos'})
            return
        }
        if(price){
            price = price.replace('.', '').replace(',', '.').replace('R$', '')
            price = parseFloat(price)
        } else {
            price = 0
        }

        const newItem = new Item()
        newItem.idUser = user._id
        newItem.name = name
        newItem.price = price
        newItem.description = desc
        newItem.idCategory = idCat._id

        //Tratando as Imagens
        if(req.files && req.files.img){
            //Apenas 1 imagem
            if(req.files.img.length === undefined){ 
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)){
                    let url = await addImage(req.files.img.data)
                    newItem.images.push({
                        url,
                        default: false
                    })
                }
            }else{
                for(let i=0; i < req.files.img.length; i++){
                    if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)){
                        let url = await addImage(req.files.img[i].data)
                        newItem.images.push({
                            url,
                            default: false
                        })
                    }
                }
            }
        }
        if(newItem.images.length > 0){
            newItem.images[0].default = true
        }

        const infoItem = await newItem.save()
        res.json({idItem: infoItem._id})

    },
    getListItem: async (req, res) => {
        let { q, cat } = req.body
        let filters = {}
        let total = 0

        //Filtros
        if(q){
            filters.name = {'$regex': q, '$options':'i'}
            filters.description = {'$regex': q, '$options':'i'}
        }
        if(cat){
            const c = await Category.findOne({slug: cat}).exec()
            if(c){
                filters.category = c._id.toString()
            }
        }
        const itemsTotal = await Item.find().exec()
        total = itemsTotal.length

        const itemsData = await Item.find(filters).exec()
        let items = []
        for(let i in itemsData){
            let image
            let defaultImg = itemsData[i].images.find(e => e.default)
            if(defaultImg){
                image = `${process.env.BASE}/media/${defaultImg.url}`
            }else{
                image = `${process.env.BASE}/media/default.jpg`
            }
            items.push({
                id: itemsData[i]._id,
                name: itemsData[i].name,
                price: itemsData[i].price,
                description: itemsData[i].description,
                category: itemsData[i].category,
                image
            })
        }
        res.json({items, total})
    },
    getItem: async (req, res) => {
        let {id} = req.body
        if(!id){
            res.json({error: 'Item não informado'})
            return
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.json({error: 'ID invalido'})
            return
        }
        const item = await Item.findById(id)
        if(!item){
            res.json({error: 'Produto inexistente'})
            return
        }

        let images = []
        for(let i in item.images){
            images.push(`${process.env.BASE}/media/${item.images[i].url}`)
        }

        let category = await Category.findById(item.idCategory).exec()
        if(!category){
            res.json({res:'Categoria não existe mais!'})
            return
        }
        let userInfo = await User.findById(item.idUser).exec()
        if(!userInfo){
            res.json({res:'Usuário não existe mais!'})
            return
        }

        res.json({
            id: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            images,
            category,
            userInfo: {
                name: userInfo.name,
                email: userInfo.email
            }
        })

    },
    editItem: async (req, res) => {
        //let {id} = req.query
        let { id, name, price, desc, cat } = req.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.json({error: 'ID invalido', id})
            return
        }

        const item = await Item.findById(id).exec()
        if(!item){
            res.json({error: 'Item inexistente'})
            return
        }
        let updates = {}
        if(name){
            updates.name = name
        }
        if(price){
            price = price.replace('.', '').replace(',', '.').replace('R$', '')
            price = parseFloat(price)
            updates.price = price
        }
        if(desc){
            updates.description = desc
        }
        if(cat){
            const category = await Category.findOne({'slug': cat}).exec()
            if(!category){
                res.json({error: 'Categoria inexistente'})
                return
            }
            updates.idCategory = category._id.toString()
        }

        await Item.findByIdAndUpdate(id, {$set: updates})
        /*
        if(req.files && req.files.img) {
            const itemImage = await Item.findById(id)

            if(req.files.img.length === undefined) {
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    let url = await addImage(req.files.img.data)
                    itemImage.images.push({
                        url,
                        default: false
                    })
                }
            } else {
                for(let i=0; i < req.files.img.length; i++) {
                    if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        let url = await addImage(req.files.img[i].data)
                        itemImage.images.push({
                            url,
                            default: false
                        })
                    }
                }
            }
            itemImage.images = [...itemImage.images]
            await Item.save()
        } */
        res.json({error: ''})
    },
    delItem: async (req, res) => {
        let id = req.body.id
        if(!id){
            res.json({res:'Item não existe'})
            return
        }
        await Item.findByIdAndDelete(id).exec()
        res.json({res:'Item deletado com sucesso!'})
    }
}