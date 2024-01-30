const express = require('express')
const router =express.Router();
const View =require('../models/viewsModel')


function getRandomNumber() {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();
  
    // Scale and shift the random number to the desired range [3000, 5000]
    const min = 3000;
    const max = 5000;
    const scaledRandomNumber = min + randomNumber * (max - min + 1);
  
    // Use Math.floor to get an integer value
    return Math.floor(scaledRandomNumber);
  }
router.route("/AddViews").post((req, res) => {
    const views = View({
        blogid : req.body.blogid,
        views : getRandomNumber(),
    });

    views.save().then((result) => {
        res.json({ data: result });
    }).catch((err) => {
        console.log(err);
        res.json({ err: err });
    });
});



router.route("/increaseViews").patch(async(req , res)=>{
    const result = await View.findOne({
      blogid: req.body.blogid
    }).lean();
  
  
    const profile = await View.findOneAndUpdate(
      {   blogid: req.body.blogid },
      {
        $set: {
          
          views : result.views + 1 
        },
      },
      { new: true }
    );
  
    res.status(200).send({status : "success"});
  })



  router.post('/getViews',  async(req, res , next) => {
    

    const nooflikes = await View.findOne({
        blogid: req.body.blogid 
        
    });

    
            res.status(200).json({ success: true , views : nooflikes.views });
            next();
});












module.exports=router
