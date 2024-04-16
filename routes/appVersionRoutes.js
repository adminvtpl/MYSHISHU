const express = require('express')
const router =express.Router();
const versions =require('../models/appVersionModel')
router.route("/getVersion/:id").patch(async (req, res) => {
    try {
        const Version = await versions.findOne({
            _id: req.params.id
        });

        if (!Version) {
            return res.status(404).json({ success: false, message: 'version not found' });
        }

        res.json({ success: true, data: Version });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
  module.exports= router;

