const express = require('express')
const router =express.Router();
const Emergency =require('../models/emergencyModel')
router.post('/emergency-contacts', async (req, res) => {
    try {
      const {phone ,  name, phoneNumber } = req.body;
      const newContact = new Emergency({phone , name, phoneNumber });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/emergency-contacts/:phone', async (req, res) => {
    try {
      const contacts = await Emergency.find({phone : req.params.phone});
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports=router
