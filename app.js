const express = require('express')
const morgan = require('morgan')
const gift_router = require("./routes/gift-exchange");
const {NotFoundError} = require("./utils/errors");

const app = express()

app.use(express.json());
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send({'ping': 'pong'})
})


const error_handler = (error, req, res, next) => {
    const status = error?.status ?? 500
    const message = error?.message ?? "Something went wrong in the application"
    res.status(status).send({'error':{'status':status, 'message':message}})
}

const not_found_handler = (req, res, next) => {
    next(new NotFoundError())
}

app.use('/gift-exchange', gift_router)
app.use(not_found_handler)
app.use(error_handler)

module.exports = app