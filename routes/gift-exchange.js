const express = require('express')
const GiftExchange = require('../models/gift-exchange')
const {BadRequestError} = require("../utils/errors");
var bodyParser = require('body-parser')

const gift_router = express.Router()

gift_router.post('/pairs', (req, res, next) => {
    try {
        console.log(req.body.names)
        res.status(200).send(GiftExchange.pairs(req.body.names));
    } catch (error) {
        console.log(error)
        next(new BadRequestError);
    }
})

gift_router.post('/traditional', (req, res, next) => {
    try {
        res.status(200).send(GiftExchange.traditional(req.body.names))
    } catch (error){
        console.log(error)
        next(new BadRequestError)
    }
})

module.exports = gift_router;