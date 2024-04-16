const express = require('express')
const router =express.Router();
const Event =require('../models/eventModel')
router.post('/events', async (req, res) => {
    try {
      const {phone , eventTitle, eventDescp, date } = req.body;
      const newEvent = new Event({ eventTitle, eventDescp, date , phone });
      await newEvent.save();
      res.status(201).json({ message: 'Event saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/events/:phone', async (req, res) => {
    try {
      const events = await Event.find({ $or: [
        { phone: req.params.phone },
        { phone: '9541126211' }
    ] });
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports=router
  
