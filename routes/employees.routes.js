const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employees.controller');


router.get('/employees', employeeController.getAll);
router.get('/employees/random', employeeController.getRandom);
router.get('/employees/:id', employeeController.getById);
router.put('/employees/', employeeController.put);
router.post('/employees/random', employeeController.post);
router.delete('/employees/random', employeeController.delete);

module.exports = router;

