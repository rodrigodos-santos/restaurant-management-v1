const express = require('express')
const router = express.Router()

const Auth = require('./middlewares/AuthUser')

//Utiliza os validators como Middlewares
const UserValidator     = require('./validators/UserValidator')
const ClientValidator   = require('./validators/ClientValidator')
const ItemValidator   = require('./validators/ItemValidator')

const UserController    = require('./controllers/UserController')
const ClientController  = require('./controllers/ClientController')
const ItemController    = require('./controllers/ItemController')
const OrderController   = require('./controllers/OrderController')

router.get('/ping', (req, res) => {
    res.json({pong: true})
})

//users
router.post     ('/user/login',     UserValidator.login, UserController.login)
router.post     ('/user',           UserValidator.addUser, UserController.addUser)
router.get      ('/user',           Auth.private, UserController.getUser)
router.put      ('/user',           UserValidator.editUser, Auth.private, UserController.editUser)
router.delete   ('/user',           Auth.private, UserController.delUser)

//clients
router.post     ('/client',         ClientValidator.addClient, Auth.private, ClientController.addClient)
router.get      ('/client',         ClientController.getClient)
router.put      ('/client',         ClientValidator.editClient, Auth.private, ClientController.editClient)
router.delete   ('/client',         Auth.private, ClientController.delClient)

//categories
router.get      ('/categories',     ItemController.getCategories)

//items
router.post     ('/item',           ItemValidator.addItem, Auth.private, ItemController.addItem)
router.get      ('/item/list',      Auth.private, ItemController.getListItem)
router.get      ('/item/item',      ItemController.getItem)
router.put      ('/item',           Auth.private, ItemController.editItem)
router.delete   ('/item',           Auth.private, ItemController.delItem)

//orders
router.post     ('/order',          Auth.private, OrderController.addOrder)
router.get      ('/order/order',    Auth.private, OrderController.getOrder)
router.get      ('/order/list',     Auth.private, OrderController.getListOrder)
router.put      ('/order',          Auth.private, OrderController.editOrder)
router.delete   ('/order',          Auth.private, OrderController.delOrder)



module.exports = router