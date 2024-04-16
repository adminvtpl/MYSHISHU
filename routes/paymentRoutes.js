const express = require('express')
const router =express.Router();
const Payment =require('../models/paymentModel')
router.post('/payments', async (req, res) => {
    const pay = new Payment({
        phone : req.body.phone,
        email : req.body.email,
        courseTitle : req.body.courseTitle,
        price : req.body.price,
        razorpay_payment_id : req.body.razorpay_payment_id
      
    });
  
    try {
      const newMilestone = await pay.save();
      res.status(201).json(newMilestone);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
router.get('/payments/:phone', async (req, res) => {
    try {
      const payments = await Payment.find({phone : req.params.phone});
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports=router
