const express = require('express')
const User=require('../models/userModel')
const jwt =require('jsonwebtoken')
const router =express.Router();
const CsvParser  = require('json2csv').Parser;
const config =require('../config')
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const key = "otp-secret-key";
router.post('/register',async(req , res)=>{
    const user = await User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        interest :req.body.interest,
  city :req.body.city,
    })
    user.save().then(()=>{
        console.log('user Registered');
        res.status(200).json({success : true , data : user});
    }).catch((err)=>{
        res.status(403).json({msg : err , success : false})
    });
   
});
router.post('/deleteUser',async(req , res)=>{
    const user = await User.findOneAndDelete({   
        phone : req.body.phone,  
    })
    
    res.status(200).json({success : true , data : user});
   
   
});
router.post('/login',async(req,res)=>{
    try {
        const data = await User.findOne(
            { email: req.body.email },
           
          
        );

        if (data == null) {
            return res.status(404).json({ msg: 'Either email or password incorrect' });
        }

       if(data.password === req.body.password){
        const token = jwt.sign({email : req.body.email} , config.secretkey ,{
            expiresIn : "24h"
        })
        res.status(200).json({ token : token , data: data, success: true , msg : "login sucessful" });
       }
       else{
        res.status(403).json({msg : "password is incorrect"});
       }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

})


router.post('/loginnumber',async(req,res)=>{
    try {
        const data = await User.findOne(
            { phone: req.body.phone },
        );
        console.log(data.email);
        if (data == null) {
            return res.status(404).json({ msg: 'Either email or password incorrect' });
        }
       if(data.password === req.body.password){
        const token = jwt.sign({email : data.email} , config.secretkey ,{
            expiresIn : "24h"
        })
        res.status(200).json({ token : token , data: data, success: true , msg : "login sucessful" });
       }
       else{
        res.status(403).json({msg : "password is incorrect"});
       }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

})


router.post('/loginnumberuser',async(req,res)=>{
    try {
        const data = await User.findOne(
            { phone: req.body.phone },
        );
        console.log(data.email);
        if (data == null) {
            return res.status(404).json({ msg: 'Either email or password incorrect' });
        }
   
        const token = jwt.sign({email : data.email} , config.secretkey ,{
            expiresIn : "24h"
        })
        res.status(200).json({ token : token , data: data, success: true , msg : "login sucessful" });
       
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

})






router.get('/checkemail/:email',async(req , res)=>{
    try {
        const data = await User.findOne(
            { email: req.params.email },
           
          
        );

        if (data !== null) {
            return res.json({ success: true });
        }
        else{
            return res.json({ success: false });
        }

      

      
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})


router.get('/checknumber/:phone',async(req , res)=>{
    try {
        const data = await User.findOne(
            { phone: req.params.phone },
           
          
        );

        if (data !== null) {
            return res.json({ success: true });
        }
        else{
            return res.json({ success: false });
        }

      

      
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})



router.patch('/update/:phone', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { phone: req.params.phone },
            { $set: { password: req.body.password } },
            { new: true } // To return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const msg = {
            msg: 'Password successfully updated',
            username: req.params.username
        };

        return res.json({ msg: msg, success: true });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.get('/exportUser',async(req , res)=>{
    try {
        let users = [];
       var userData = await User.find({});
       userData.forEach((user)=>{
        const {id , name , email , phone , interest,city} = user;
        users.push({id , name , email , phone , interest,city});
       });
       const csvField =['Id','Name','Email','Phone' , 'Interest','city'];
       const csvParser = new CsvParser({csvField});
       const csvData = csvParser.parse(users);
       res.setHeader("Content-Type","text/csv");
       res.setHeader("Content-Disposition","attatchment : filename=usersData.csv");
       res.status(200).end(csvData);


    } catch (error) {
        res.send({status : 400 , success : false , msg: error.message});
    }
})


module.exports=router
