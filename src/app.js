const { v4: uuid } = require('uuid')
const express = require('express')

const app = express()

app.use(express.json())

const customers = []

// Função para ser usada de middleware
function verifyExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers
    
    const customer = customers.find(customer => customer.cpf === cpf)

    if(!customer) {
        return response.status(400).json({error: "Customer not found"})
    }
    request.customer = customer

    next()
}

// Deve ser possível buscar o extrato bancário do cliente
function getBalance(statement){
    const balance = statement.reduce((acc, operation) => 
         operation.type === 'credit'
            ? acc + operation.amount
            : acc - operation.amount
    , 0)

    return balance
}

// Deve ser possível criar uma conta
app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    // Não deve ser possível cadastrar uma conta com CPF já exístente
    const customerAlreadyExists = customers.some(
        customer => customer.cpf === cpf
    )

    if(customerAlreadyExists){
        return response.status(400).json({
            message: 'Customer already exists!'
        })
    }

    customers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    })

    return response.status(201).send()
})

app.get('/statement', verifyExistsAccountCPF, (request, response) => {   
    const { customer } = request
    return response.json(customer.statement)
})

// Deve ser possível realizar um depósito
app.post('/deposit', verifyExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

// Deve ser possível realizar um saque
app.post('/withdraw', verifyExistsAccountCPF, (request, response) => {
    const { amount } = request.body
    const { customer } = request

    const balance = getBalance(customer.statement)

    // Não deve ser possível fazer saque quando o saldo for insuficiente
    if(balance < amount){
        return response.status(400).json({error: 'Insufficient funds!'})
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

// Deve ser possível buscar o extrato bancário do cliente por data
app.get('/statement/date', verifyExistsAccountCPF, (request, response) => {   
    const { customer } = request
    const { date } = request.query

    const statement = customer.statement.filter(statement => 
        statement.created_at.toISOString().includes(date)
    )

    return response.json(statement)
})

// Deve ser possível atualizar dados da conta do cliente
app.put('/account', verifyExistsAccountCPF, (request, response) => {
    const { name } = request.body
    const { customer } = request

    customer.name = name

    return response.status(201).send()
})

// Deve ser possível obter dados da conta do cliente
app.get('/account', verifyExistsAccountCPF,(request, response) => {
    const { customer } = request

    return response.json(customer)
})

// Deve ser possível deletar uma conta
app.delete('/account', verifyExistsAccountCPF, (request, response) => {
    const { customer } = request

    const indexCustomer = customers.indexOf(customer)

    customers.splice(indexCustomer, 1)

    return response.status(200).json(customers)
})

// Deve ser possível retornar o balanço
app.get('/balance', verifyExistsAccountCPF, (request, response) => {
    const { customer } = request

    const balance = getBalance(customer.statement)

    return response.json(balance)
})

module.exports = app
