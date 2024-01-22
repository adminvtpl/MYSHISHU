const express = require('express')
const Profile =require('../models/profileModel')

const multer = require('multer')
const path = require('path');
const router =express.Router();
const {profile} = require('console');



const storage = multer.diskStorage({
    destination :(req , file , cb)=>{
        cb(null,"./uploads");

    },
    filename : (req , file , cb)=>{
     cb(null , req.params.phone + ".jpg");

    },
})
const fileFilter=(req , file , cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null , true);
    }
    else{
        cb(null , false);
    }
}
const upload =multer({
    storage : storage,
    limits :{
        fileSize : 1024 * 1024 *6,
    },
    // fileFilter :fileFilter,

})
// router.route("/add/image").patch( middleware.checkToken,upload.single("img"),async(req, res)=>{
// await Profile.findOneAndUpdate(
// {username : req.decoded.username},
// {
//     $set : {
//         img : req.file.path
//     }
// },
// {new : true},
// (err , profile)=>{
//     if(err){
//         return res.status(500).send(err);
//     }
//     const response ={
//         message : "image added sucessfully updated",
//         data : profile
//     };
//     return res.status(200).send(response);
// }

// );
// })

router.route("/add/image/:phone").patch( upload.single("img"), async (req, res) => {
    try {
      const profile = await Profile.findOneAndUpdate(
        { phone: req.params.phone },
        {
          $set: {
            img: req.file.path,
          },
        },
        { new: true }
      );
  
      const response = {
        message: "Image added successfully updated",
        data: profile,
      };
  
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message || "Internal Server Error");
    }
  });
  

router.post('/add',  (req, res) => {
    

    const user = Profile({
        phone: req.body.phone,
        name: req.body.name,
        profession: req.body.profession,
        dob: req.body.dob,
        titleline: req.body.titleline,
        about: req.body.about,
    });

    user.save()
        .then(() => {
            console.log('Profile Registered');
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.error('Error saving profile:', err);
            res.status(403).json({ msg: err, success: false });
        });
});

router.route('/checkProfile/:phone').get( async (req, res) => {
  try {
    const result = await Profile.findOne({ phone: req.params.phone });
    if (result === null) {
      return res.json({ status: false });
    } else {
      return res.json({ status: true , name : result.name });
    }
  } catch (err) {
    return res.json({ err: err  });
  }
});



router.route('/getData/:phone').get( async (req, res) => {
  try {
    const result = await Profile.findOne({
      phone: req.params.phone
    }).lean();

    if (result == null) {
      return res.json({ data: [] });
    } else {
      return res.json({ data: result });
    }
  } catch (err) {
    return res.json({ err: err.message });
  }
});


router.route("/update/:phone").patch(async(req , res)=>{
  const result = await Profile.findOne({
    phone: req.params.phone
  }).lean();


  const profile = await Profile.findOneAndUpdate(
    { phone: req.params.phone },
    {
      $set: {
        name : req.body.name ? req.body.name : result.name,
        profession : req.body.profession ? req.body.profession : result.profession,
        dob : req.body.dob ? req.body.dob : result.dob,
        titleline : req.body.titleline ? req.body.titleline : result.titleline,
        about : req.body.about ? req.body.about : result.about,
      },
    },
    { new: true }
  );

  res.status(200).send({status : "success"});






})

router.post('/getProfile', async (req, res) => {
  try {
      const user = await Profile.findOne({
          phone: req.body.phone,
        
      });

      if (user) {
          console.log('user found');
          res.status(200).json({ success: true , name : user.name , img : user.img  });
      } else {
          console.log('user not found');
          res.status(404).json({ success: false, msg: 'user not' });
      }
  } catch (err) {
      console.error('Error deleting Like:', err);
      res.status(500).json({ msg: err.message, success: false });
  }
});




module.exports=router