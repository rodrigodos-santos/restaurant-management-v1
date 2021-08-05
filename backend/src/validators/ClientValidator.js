const { checkSchema } = require('express-validator')

module.exports = {
    addClient: checkSchema({
        name: {
            trim: true,
            isLength:{
                options: { min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        phone: {
            isLength: {
                options: { min: 11, max: 11 }
            },
            errorMessage: 'Digite um número válido'
        }
    }),
    editClient: checkSchema({
        name: {
            optional: true,
            trim: true,
            isLength:{
                options: { min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        phone: {
            optional: true,
            isLength: {
                options: { min: 11, max: 11 }
            },
            errorMessage: 'Digite um número válido'
        }
    }) 
}
