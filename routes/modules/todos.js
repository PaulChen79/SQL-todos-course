const express = require('express')
const router = express.Router()
const todoController = require('../../controller/todosControllers')

router.get('/', todoController.getTodos)
router.get('/new', todoController.getCreateTodoPage)
router.post('/',todoController.createTodo)
router.get('/:id', todoController.getTodo)
router.get('/:id/edit', todoController.getEditTodoPage)
router.put('/:id/edit', todoController.editTodo)
router.delete('/:id', todoController.deleteTodo)


module.exports = router