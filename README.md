## Fin Api

It´s a local API (no db) to highlight examples of **HTTP**, **Middleware** and **Express**.

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

### Features
- [x] Should be able to create an account
- [x] Should be able to seek for the customer bank statement
- [x] Should be able to make a deposit
- [x] Should be able to to make a withdrawal
- [x] Should be able to retrieve the customer's bank statement by date
- [x] Should be able to update the customer's account data
- [x] Should be able to obtain customer account data
- [x] Should be able to delete an account
- [x] Should be able to return the balance

### Business Rules
- [x] Shouldn´t be able to register an account with an existing CPF
- [x] Shouldn´t be able to fetch a statement from a non-existent account
- [x] Shouldn´t be able to make a deposit into a non-existing account
- [x] Shouldn´t be able to withdraw to a non-existent account
- [x] Shouldn´t be able to withdraw when the balance is insufficient
- [x] Shouldn´t be able to delete a non-existent account
