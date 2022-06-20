const db = require('../models')
const Todo = db.Todo

const todoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.findAll({ raw: true, nest: true })
      return res.render("index", { todos: todos })
    } catch (error) {
      console.log(error)
      res.status(422).json(error)
    }
  },
  getTodo: async (req, res) => {
    try {
      const todoId = req.params.id
      const todo = await Todo.fineByPk(todoId, { raw: true, nest: true })
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
  getEditTodoPage: (req, res) => {
    res.render('edit')
  },
  createTodo: async (req, res) => {
    try {
      const { name } = req.body
      if (!name) {
        console.log('name needs to be provided')
        return res.redirect('/todos/new')
      }
      await Todo.create({ name })
      return res.redirect('/todos')
    } catch (error) {
      console.log(error)
    }
  },
  editTodo: async (req, res) => {
    try {
      const todoId = req.params.id
      const { name } = req.body
      if (!name) {
        console.log('name needs to be provided')
        return res.redirect('/todos/edit')
      }
      const todo = await Todo.findByPk(todoId)
      if (!todo) {
        console.log('todo is not exist')
        return res.redirect(`/todos/${todoId}/edit`)
      }
      await todo.update({ name })
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