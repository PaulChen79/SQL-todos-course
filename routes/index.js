const express = require('express')
const router = express.Router()
const passport = require('passport')
const pageController = require('../controller/page-controllers')
const { authenticated } = require('../middleware/auth')
const todos = require('./modules/todos')

router.use('/todos', authenticated, todos)

router.get('/users/login', pageController.getLoginPage)

router.post('/users/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login"
}))

router.get('/users/register', pageController.getRegisterPage)

router.post('/users/register', pageController.register)

router.get('/users/logout', pageController.logout)

module.exports = router