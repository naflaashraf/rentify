const express = require('express')
const { UserRegister, UserLogin, UserUpdate, UserDelete, UserLogout } = require('../../controller/user/usersController')
const userRoutes = express.Router()

userRoutes.post('/register', UserRegister)
userRoutes.post('/login', UserLogin)

//update/api/vi/users/:id
userRoutes.put('/', UserUpdate)
userRoutes.post('/',UserLogout)
//delete/api/vi/users/login
userRoutes.delete('/', UserDelete)
module.exports = userRoutes
