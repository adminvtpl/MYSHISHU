const express = require('express')
const router =express.Router();
const Feedback =require('../models/feedbackModel')





router.post('/add',  (req, res) => {
    

    const feedbackPo = Feedback({
        phone: req.body.phone,
        feedback : req.body.feedback
        
    });

    feedbackPo.save()
        .then(() => {
            console.log('Profile Registered');
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.error('Error saving profile:', err);
            res.status(403).json({ msg: err, success: false });
        });
});

module.exports=router