const express = require('express')
const router =express.Router();
const Medical =require('../models/medicalinfoModel')
router.post('/medical-info', async (req, res) => {
    try {
      const {phone ,  allergies, medications } = req.body;
      const newMedicalInfo = new Medical({phone , allergies, medications });
      await newMedicalInfo.save();
      res.status(201).json(newMedicalInfo);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/medical-info/:phone', async (req, res) => {
    try {
      const info = await Medical.findOne({phone : req.params.phone});
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports=router

