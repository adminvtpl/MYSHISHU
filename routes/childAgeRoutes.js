const express = require('express')
const router =express.Router();
const childAge =require('../models/childAgeModel')
const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination :(req , file , cb)=>{
        cb(null,"./uploads");

    },
    filename : (req , file , cb)=>{
     cb(null , req.params.id + ".jpg");

    },
})
const upload =multer({
    storage : storage,
    limits :{
        fileSize : 1024 * 1024 *6,
    },
   

})
router.route("/add/coverImage/:id").patch( 
    upload.single("img"), async (req, res) => {
      try {
        const blogpost = await childAge.findOneAndUpdate(
          {_id : req.params.id},
          {
              $set: {
                  coverImage: req.file.path,
              },
          },
          { new: true }
        );
    
        const response = {
          message: "Image added successfully ",
          data: blogpost,
        };
    
        res.status(200).send(response);
      } catch (error) {
        res.status(500).send(error.message || "Internal Server Error");
      }
    });
router.route("/AddChild").post((req, res) => {

    const blogpost = childAge({
        phone: req.body.phone,
        childName: req.body.childName,
        DateOfBirth: req.body.DateOfBirth,
        


    });

    blogpost.save().then((result) => {
        res.json({ data: result["_id"] });
    }).catch((err) => {
        console.log(err);
        res.json({ err: err });
    });
});


router.get('/child/:phone', async (req, res) => {
    try {
      const phone = req.params.phone;
      const memories = await childAge.find({ phone: phone }).sort({ _id : -1 });
  
      if (!memories || memories.length === 0) {
        return res.status(404).json({ error: 'No memories found for the phone number' });
      }
  
      res.json(memories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports=router
