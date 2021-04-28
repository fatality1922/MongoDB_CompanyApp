const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');


router.get('/products', productController.getAll);
router.get('/products/random', productController.getRandom);
router.get('/products/:id', productController.getById);
router.put('/products/', productController.put);
router.post('/products/random', productController.post);
router.delete('/products/random', productController.delete);

module.exports = router;

