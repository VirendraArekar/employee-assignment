const express = require('express');
const router = express.Router();
const todoRoutes = require('./todo.routes');
const employeeRoutes = require('./employee.routes');
router.use('/todos', todoRoutes);
router.use('/employees', employeeRoutes);


module.exports = router;