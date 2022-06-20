const db = require('../models')
const Todo = db.Todo

const todoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.findAll({ where: { UserId: req.user.id }, raw: true, nest: true })
      return res.render("index", { todos })
    } catch (error) {
      console.log(error)
      res.status(422).json(error)
    }
  },
  getTodo: async (req, res) => {
    try {
      const todoId = req.params.id
      const todo = await Todo.findByPk(todoId, { raw: true, nest: true })
      if (!todo) {
        console.log('todo is not exist')
        return res.redirect('/todos')
      }
      return res.render('detail', { todo })
    } catch (error) {
      console.log(error)
    }
  },
  getCreateTodoPage: (req, res) => {
    res.render('new')
  },
  getEditTodoPage: async (req, res) => {
    try {
      const todoId = req.params.id
      const todo = await Todo.findByPk(todoId, { raw: true, nest: true })
      if (!todo) {
        console.log('todo is not exist')
        return res.redirect(`/todos`)
      }
      return res.render('edit', { todo })
    } catch (error) {
      console.log(error)
    }
  },
  createTodo: async (req, res) => {
    try {
      const { name } = req.body
      const UserId = req.user.id
      if (!name) {
        console.log('name needs to be provided')
        return res.redirect('/todos/new')
      }
      await Todo.create({ name, UserId })
      return res.redirect('/todos')
    } catch (error) {
      console.log(error)
    }
  },
  editTodo: async (req, res) => {
    try {
      const UserId = req.user.id
      const todoId = req.params.id
      const { name, isDone } = req.body
      if (!name) {
        console.log('name needs to be provided')
        return res.redirect('/todos/edit')
      }
      const todo = await Todo.findByPk(todoId)
      if (!todo) {
        console.log('todo is not exist')
        return res.redirect(`/todos/${todoId}/edit`)
      }
      let checkIsDone = 0
      if (isDone === 'on') {
        checkIsDone = 1
      }
      await todo.update({ name, UserId, isDone: checkIsDone })
      return res.redirect(`/todos/${todoId}`)
    } catch (error) {
      console.log(error)
    }
  },
  deleteTodo: async (req ,res) => {
    try {
      const todoId = req.params.id
      const todo = await Todo.findByPk(todoId)
      if (!todo) {
        console.log('todo is not exist')
        return res.redirect('/todos/edit')
      }
      await todo.destroy()
      return res.redirect('/todos')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = todoController