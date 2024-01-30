const express = require('express')
const router =express.Router();
const BlogPost = require("../models/blogpostModel")
const dateTime = require("../models/dateTimeModel")
const multer = require('multer')
const path = require('path');
const {profile} = require('console');



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



router.route("/add/coverImage/:id").patch( upload.single("img"), async (req, res) => {
    try {
      const blogpost = await BlogPost.findOneAndUpdate(
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
 
router.route("/Add").post((req, res) => {
    const blogpost = BlogPost({
        phone: req.body.phone,
        title: req.body.title,
        body: req.body.body,
    });

    blogpost.save().then((result) => {
        res.json({ data: result["_id"] });
    }).catch((err) => {
        console.log(err);
        res.json({ err: err });
    });
});




router.route("/AddDateTime").post((req, res) => {
    const jj = dateTime({
        blogid : req.body.blogid,
    date : req.body.date ,
    time : req.body.time 
    });

    jj.save().then((result) => {
        res.json({ data: result["_id"] , success : true });
    }).catch((err) => {
        console.log(err);
        res.json({ err: err });
    });
});


router.route("/fetchDateTime").post(async(req, res) => {
    const jj = await dateTime.findOne({
        blogid : req.body.blogid,
    });


    jj.save().then((result) => {
        res.json({ date: jj.date , time : jj.time , success : true });
    }).catch((err) => {
        console.log(err);
        res.json({ err: err });
    });
});




router.route("/getOwnBlog/:phone").get((req, res) => {
    BlogPost.find({ phone: req.params.phone })
        .sort({ _id : -1 })
        .exec()
        .then(result => {
            return res.json({ data: result });
        })
        .catch(err => {
            return res.json({ err });
        });
});



// router.route("/getAllBlogs/:phone").get((req, res) => {
//     BlogPost.find({phone : {$ne : req.params.phone}})
//         .exec()
//         .then(result => {
//             return res.json({ data: result });
//         })
//         .catch(err => {
//             return res.json({ err });
//         });
// });
router.route("/getAllBlogs/:phone").get((req, res) => {
    BlogPost.find({})
        .sort({ _id : -1 }) // Replace 'createdAt' with the actual field you want to use for sorting
        .exec()
        .then(result => {
            return res.json({ data: result });
        })
        .catch(err => {
            return res.json({ err });
        });
});



router.route("/delete/:id/:phone").delete((req, res) => {
    BlogPost.findOneAndDelete({
       $and : [
        { phone : req.params.phone},
        { _id: req.params.id}
       ]
    })
    .then(result => {
        if (result) {
            console.log(result);
            res.json(result);
        } else {
            res.json({ message: "No matching document found." });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    });
});



router.route("/update/likes").patch(async(req , res)=>{
    const result = await BlogPost.findOne({
      _id: req.body._id
    }).lean();
  
  
    const profile = await BlogPost.findOneAndUpdate(
      {  _id: req.body._id },
      {
        $set: {
          
          like : result.like +1 
        },
      },
      { new: true }
    );
  
    res.status(200).send({status : "success"});
  
  
  
  
  
  
  })






  router.route("/update/dislikes").patch(async(req , res)=>{
    const result = await BlogPost.findOne({
      _id: req.body._id
    }).lean();
  
  
    const profile = await BlogPost.findOneAndUpdate(
      {  _id: req.body._id },
      {
        $set: {
          
          like : result.like -1 
        },
      },
      { new: true }
    );
  
    res.status(200).send({status : "success"});
  
  
  
  
  
  
  })




  router.post('/getLikes',  async(req, res) => {
    

    const nooflikes = await BlogPost.findOne({
        "_id" : req.body._id
        
    });

    nooflikes.save()
        .then(() => {
            console.log('Profile Registered');
            res.status(200).json({ success: true , likes : nooflikes.like });
        })
        .catch((err) => {
            console.error('Error saving profile:', err);
            res.status(403).json({ msg: err, success: false });
        });
});





module.exports=router