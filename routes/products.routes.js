const express = require('express');
const router = express.Router();
const product = require('../models/products.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {

  try {
    const count = await product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await product.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.get('/products/:id', async (req, res) => {

  try {
    const dep = await product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/products', async (req, res) => {

  try {

    const { name, client } = req.body;
    const newproduct = new product({ name: name, client: client });
    await newproduct.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;

  try {
    const dep = await(product.findById(req.params.id));
    if(dep) {
      await product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/products/:id', async (req, res) => {

  try {
    const dep = await(product.findById(req.params.id));
    if(dep) {
      await product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});
module.exports = router;

