const { validationResult, matchedData } = require('express-validator') 
const mongoose = require('mongoose')

const Client = require('../models/Client')
const Item = require('../models/Item')
const Order = require('../models/Order')

module.exports = {
    addOrder: async (req, res) => {
        let { emailClient, table, statusOrder, serviceTable, total } = req.body
        const client = await Client.findOne({'email': emailClient}).exec()
        if(!client){
            res.json({error:'Cliente não encontrado'})
        }
        const items = req.body.items

        if(!table || !serviceTable || !total){
            res.json({error: 'Mesa, total e/ou serviço de mesa não preenchidos'})
            return
        }
        if(!statusOrder){
            statusOrder = "Novo"
        }

        const newOrder = new Order()
        newOrder.idClient = client._id
        newOrder.table = table
        newOrder.statusOrder = statusOrder
        newOrder.date = new Date()
        newOrder.serviceTable = serviceTable
        newOrder.items = items 
        newOrder.total = total

        const infoOrder = await newOrder.save()
        res.json({id: infoOrder._id})

    },
    getOrder: async (req, res) => {
        let {id} = req.body
        if(!id){
            res.json({error: 'Pedido não informado'})
            return
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.json({error: 'ID invalido'})
            return
        }
        const order = await Order.findById(id).exec()
        if(!order){
            res.json({error: 'Pedido não encontrado'})
            return
        }

        let client = await Client.findById(order.idClient).exec()
        if(!client){
            res.json({error: 'Cliente não encontrado'})
            return
        }

        res.json({
            id: order._id,
            name: client.name,
            table: order.table,
            statusOrder: order.statusOrder,
            date: order.date,
            serviceTable: order.serviceTable,
            items: order.items,
            total: order.total
        })
    },
    getListOrder: async (req, res) => {
        let { idClient, statusOrder } = req.body
        let filters = {}
        if(statusOrder){
            filters.statusOrder = { '$regex':statusOrder, '$options':'i' }
        }
        
        if(idClient){
            filters.idClient = { idClient }
        }

        const ordersData = await Order.find(filters).exec()
        const orders = []
        for(let i in ordersData){
            orders.push({
                id: ordersData[i]._id,
                items: ordersData[i].items,
                idClient: ordersData[i].idClient,
                table: ordersData[i].table,
                statusOrder: ordersData[i].statusOrder,
                date: ordersData[i].date,
                serviceTable: ordersData[i].date,
                total: ordersData[i].total
            })
        }
        totalOrders = orders.length
        res.json({orders, totalOrders})
        
    },
    editOrder: async (req, res) => {
        let { id, items, table, statusOrder } = req.body
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.json({error: 'ID invalido', id})
            return
        }
        const order = await Order.findById(id).exec()
        if(!order){
            res.json({error: 'Pedido inexistente'})
            return
        }
        let updates = {}
        if(items){
            updates.items = items
        }
        if(table){
            updates.table = table
        }
        if(statusOrder){
            updates.statusOrder = statusOrder
        }

        await Order.findByIdAndUpdate(id, {$set: updates})
        res.json({error:''})
    },
    delOrder: async (req, res) => {
        let id = req.body.id
        if(!id){
            res.json({res:'Pedido não existe'})
            return
        }
        await Order.findByIdAndDelete(id).exec()
        res.json({res:'Pedido deletado com sucesso!'})
    }
}