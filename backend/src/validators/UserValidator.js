const { checkSchema } = require('express-validator')

module.exports = {
    login: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: { min: 4 }
            },
            errorMessage: 'Senha precisa ter pelo menos 4 caracteres'
        }
    }),
    addUser: checkSchema({
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
        password: {
            isLength: {
                options: { min: 4 }
            },
            errorMessage: 'Senha precisa ter pelo menos 4 caracteres'
        },
        level: {
            notEmpty: true,
            errorMessage: 'Informar o nível de acesso!'
        }
    }),
    editUser: checkSchema({
        token: {
            notEmpty: true
        },
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
        password: {
            optional: true,
            isLength: {
                options: { min: 4 }
            },
            errorMessage: 'Senha precisa ter pelo menos 4 caracteres'
        },
        level: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Informar o nível de acesso!'
        }
    })
}
