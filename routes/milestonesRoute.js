const express = require('express')
const router =express.Router();
const milestones =require('../models/milestoneModel')
router.patch('/mile/:id', async (req, res) => {
    try {
      const milestone = await milestones.findById(req.params.id);
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found' });
      }
      if (req.body.count != null) {
        milestone.count += req.body.count;
      }
      const updatedMilestone = await milestone.save();
      res.json(updatedMilestone);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.get('/mile/:phone', async (req, res) => {
    try {
      const milestone = await milestones.find({ phone : req.params.phone});
      res.json(milestone);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/mile', async (req, res) => {
    const milestone = new milestones({
        phone : req.body.phone,
      type: req.body.type,
    });
  
    try {
      const newMilestone = await milestone.save();
      res.status(201).json(newMilestone);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  module.exports=router
