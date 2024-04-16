const express = require('express')
const todo=require('../models/toDoModel')
const router =express.Router();





router.route("/add").post(async (req, res) => {
    const TODO = await todo({
        phone : req.body.phone,
        title : req.body.title,
        desc  :req.body.desc,
    });

    TODO.save().then((result) => {
        res.json({ success : true , data : result});
    }).catch((err) => {
        console.log(err);
        res.json({ err: err });
    });
});
router.route("/getToDo").post(async (req, res) => {
    const TODO = await todo.find({
        phone : req.body.phone,
        
    });

   
res.json({  success : TODO });

});


router.route("/deleteempty").patch(async (req, res,next) => {
    const TODO = await todo.deleteMany({
        phone : ""
        
    });

   
res.json({ success : true , data : TODO });
next();

});






router.route("/delete/:id").patch(async (req, res) => {
    try {
        const TODO = await todo.findOneAndDelete({
            _id: req.params.id
        });

        if (!TODO) {
            return res.status(404).json({ success: false, message: 'TODO not found' });
        }

        res.json({ success: true, data: TODO });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




module.exports=router
