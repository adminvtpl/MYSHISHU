const express = require('express')
const router =express.Router();
const courseLike =require('../models/courseLikeModel')
router.post('/like/add',  (req, res) => {

    const user = courseLike({
        phone: req.body.phone,
        likeid : req.body.likeid,
        title : req.body.title,
        description: req.body.description,
         im : req.body.im, 
         pm : req.body.pm,
          ls: req.body.ls, 
          price: req.body.price, 
          diff: req.body.diff , 
          dub: req.body.dub,
          link : req.body.link
        
    });

    user.save()
        .then(() => {
            console.log('Like Registered');
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.error('Error saving Like:', err);
            res.status(403).json({ msg: err, success: false });
        });
});
router.post('/like/remove', async (req, res) => {
    try {
        const user = await courseLike.findOneAndDelete({
            phone: req.body.phone,
            likeid: req.body.likeid,
        });

        if (user) {
            console.log('Like deleted');
            res.status(200).json({ success: true });
        } else {
            console.log('Like not found');
            res.status(404).json({ success: false, msg: 'Like not found' });
        }
    } catch (err) {
        console.error('Error deleting Like:', err);
        res.status(500).json({ msg: err.message, success: false });
    }
});

router.post('/like/check', async (req, res) => {
    try {
        const user = await courseLike.findOne({
            phone: req.body.phone,
            likeid: req.body.likeid,
        });

        if (user) {
            console.log('like is their');
            res.status(200).json({ success: true });
        } else {
            console.log('Like not found');
            res.status(404).json({ success: false, msg: 'Like not found' });
        }
    } catch (err) {
        console.error('Error deleting Like:', err);
        res.status(500).json({ msg: err.message, success: false });
    }
});
router.get('/carts/:phone', async (req, res) => {
    try {
      const carts = await courseLike.find({phone : req.params.phone}).sort({ _id : -1 });
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports=router
