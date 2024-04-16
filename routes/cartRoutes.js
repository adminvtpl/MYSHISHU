const express = require('express')
const router =express.Router();
const cart =require('../models/cartModel')
router.post('/carts', async (req, res) => {
    const Carts = new cart({
        phone : req.body.phone,
           likeid : req.body.likeid,
        title : req.body.title,
    description: req.body.description,
     im : req.body.im, 
     pm : req.body.pm,
      ls: req.body.ls, 
      price: req.body.price, 
      diff: req.body.diff, 
      dub: req.body.dub,
   link : req.body.link,
      
    });
  
    try {
      const courseCart = await Carts.save();
      res.status(201).json(courseCart);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
router.get('/carts/:phone', async (req, res) => {
    try {
      const carts = await cart.find({phone : req.params.phone}).sort({ _id : -1 });
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.route("/deletecart/:id").patch(async (req, res) => {
    try {
        const Carts = await cart.findOneAndDelete({
            _id: req.params.id
        });

        if (!Carts) {
            return res.status(404).json({ success: false, message: 'carts not found' });
        }

        res.json({ success: true, data: Carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
  module.exports=router
