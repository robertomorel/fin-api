## Fin Api

It´s a local API (no db) to highlight examples of **HTTP**, **Middleware** e **Express**.

![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## How to run
```bash
    # Install dependencies
    $ yarn install

    # Start API
    $ yarn start
    
    # Run tests
    $ yarn tests
    
    # Run tests with coverage
    $ yarn jest --collect-coverage
```

## DDD

### Requisitos
- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o balanço

### Regras de negócio
- [x] Não deve ser possível cadastrar uma conta com CPF já exístente
- [x] Não deve ser possível buscar extrato em uma conta não exístente
- [x] Não deve ser possível fazer depósito em uma conta não exístente
- [x] Não deve ser possível fazer saque em uma conta não exístente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não exístente
