const express = require('express');
const controller = require('../controllers/employee.controller');
const validate = require('../middlewares/validate');
const employeeValidation = require('../validations/employee.validation');
const router = express.Router();

router
  .route('/')
  .get(validate(employeeValidation.getEmployee) ,controller.list)
  .post(validate(employeeValidation.createEmployee) ,controller.create);

router
  .route('/:id')
  .get(validate(employeeValidation.getEmployeeById) ,controller.get)
  .put(validate(employeeValidation.updateEmployee) ,controller.update)
  .patch(validate(employeeValidation.updateEmployee) ,controller.update)
  .delete(validate(employeeValidation.deleteEmployee) ,controller.remove);

module.exports = router;