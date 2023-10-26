const express = require('express');
const routes = express.Router();

const userController = require('../controller/userController');


routes.post('/user', userController.createUser);
routes.get('/users', userController.findAllUser);
routes.get('/user', userController.findOneUser);
routes.delete('/user/:id', userController.deleteUser);
routes.put('/user/:id', userController.updateUser);
routes.post('/user/authenticated', userController.authenticatedUser);


module.exports = routes;
