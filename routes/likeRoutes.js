const express = require('express')
const router =express.Router();
const Like =require('../models/likeModel')
router.post('/like/add',  (req, res) => {
    

    const user = Like({
        phone: req.body.phone,
        likeid : req.body.likeid,
        
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
        const user = await Like.findOneAndDelete({
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
        const user = await Like.findOne({
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




module.exports=router