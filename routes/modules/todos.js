const express = require('express')
const router = express.Router()
const todoController = require('../../controller/todosControllers')

router.get('/', todoController.getTodos)

module.exports = router