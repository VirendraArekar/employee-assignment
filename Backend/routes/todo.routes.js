const express = require('express');
const controller = require('../controllers/todo.controller');
const validate = require('../middlewares/validate');
const todoValidation = require('../validations/todo.validation');
const router = express.Router();

router
  .route('/')
  .get(validate(todoValidation.getTodo) ,controller.list)
  .post(validate(todoValidation.createTodo) ,controller.create);

router
  .route('/:id')
  .get(validate(todoValidation.getTodoById) ,controller.get)
  .patch(validate(todoValidation.updateTodo) ,controller.update)
  .delete(validate(todoValidation.deleteTodo) ,controller.remove);

module.exports = router;
