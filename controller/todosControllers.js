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
}

module.exports = todoController