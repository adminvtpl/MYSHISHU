const express = require('express')
const router =express.Router();
const imageSave =require('../models/imageSaveModel')
router.post('/image', async (req, res) => {
    try {
      const {phone ,  imgLink ,date , time , downloadLink   } = req.body;
      const Image = new imageSave({phone ,  imgLink ,date , time , downloadLink  });
      await Image.save();
      res.status(201).json(Image);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
router.get('/image/:phone', async (req, res) => {
    try {
      const phone = req.params.phone;
      const memories = await imageSave.find({ phone: phone }).sort({ _id : -1 });
  
      if (!memories || memories.length === 0) {
        return res.status(404).json({ error: 'No Image found for the phone number' });
      }
  
      res.json(memories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.route("/image/:id").patch(async (req, res) => {
    try {
        const Mem = await imageSave.findOneAndDelete({
            _id: req.params.id
        });

        if (!Mem) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        res.json({ success: true, data: Mem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


  module.exports=router
