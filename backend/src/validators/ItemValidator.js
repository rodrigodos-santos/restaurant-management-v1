const { checkSchema } = require('express-validator')

module.exports = {
    addItem: checkSchema({
        name: {
            trim: true, //remove os espaços
            isLength:{
                options: { min: 5}
            },
            errorMessage: 'Nome do Item precisa ter pelo menos 5 caracteres'
        },
        price: {
            trim: true,
            isFloat: true,
            notEmpty: true,
            errorMessage: 'Erro no Valor Informado'
        },
        description: {
            trim: true,
            notEmpty: true,
            isLength: {
                options: { min: 10 }
            },
            errorMessage: 'Erro ao Informar a descrição'
        }
    })
}
