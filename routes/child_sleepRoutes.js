const express = require('express')
const router =express.Router();
const child = require("../models/child_sleepModel")
router.post('/track_sleep', async (req, res) => {
    try {
      const {phone , hours } = req.body;
      const newSleep = new child({ hours , phone });
      await newSleep.save();
      res.status(200).send('Sleep tracked successfully!');
    } catch (error) {
      console.error('Error tracking sleep:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/get_sleep_data/:phone', async (req, res) => {
    try {
      const sleepData = await child.find({phone : req.params.phone}).sort({ timestamp: 'desc' });
      res.status(200).json(sleepData);
    } catch (error) {
      console.error('Error retrieving sleep data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports=router
