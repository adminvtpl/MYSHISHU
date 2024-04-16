const express = require('express')
const router =express.Router();
const memory =require('../models/memoriesModel')
const multer = require('multer')


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


router.route("/add/memoryImage/:id").patch( 
  upload.single("img"), async (req, res) => {
    try {
      const Memories = await memory.findOneAndUpdate(
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
        data: Memories,
      };
  
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message || "Internal Server Error");
    }
  });

router.post('/memory', async (req, res) => {
    try {
      const {phone ,  title, description ,date  } = req.body;
      const Memories = new memory({phone ,  title , description ,date });
      await Memories.save();
      res.status(201).json(Memories);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/memory/:phone', async (req, res) => {
    try {
      const phone = req.params.phone;
      const memories = await memory.find({ phone: phone }).sort({ _id : -1 });
  
      if (!memories || memories.length === 0) {
        return res.status(404).json({ error: 'No memories found for the phone number' });
      }
  
      res.json(memories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
router.route("/deleteMemory/:id").patch(async (req, res) => {
    try {
        const Mem = await memory.findOneAndDelete({
            _id: req.params.id
        });

        if (!Mem) {
            return res.status(404).json({ success: false, message: 'Memory not found' });
        }

        res.json({ success: true, data: Mem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
  
  module.exports=router
