const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');


router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.put('/departments/', DepartmentController.put);
router.post('/departments/random', DepartmentController.post);
router.delete('/departments/random', DepartmentController.delete);

module.exports = router;

