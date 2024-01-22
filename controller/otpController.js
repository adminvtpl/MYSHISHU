const otpService = require('../services/otpService')
exports.otpLogin= (req , res , next)=>{
    otpService.sendOTP(req.body , (error , results)=>{
        if(error){
            return res.status(400).send({
                message : "error",
                data : error,
            });
        }
        return res.status(200).send({
            message : "Success",
            data : results,
        });
    })
}

exports.otpLoginonMobile= (req , res , next)=>{
    otpService.sendOTPonmobile(req.body , (error , results)=>{
        if(error){
            return res.status(400).send({
                message : "error",
                data : error,
            });
        }
        return res.status(200).send({
            message : "Success",
            data : results,
        });
    })
}


exports.verifyOTP= (req , res , next)=>{
    otpService.verifyOTP(req.body , (error , results)=>{
        if(error){
            return res.status(400).send({
                message : "error",
                data : error,
            });
        }
        return res.status(200).send({
            message : "Success",
            data : results,
        });
    })
}

exports.verifyOTPonmobile= (req , res , next)=>{
    otpService.verifyOTPonMobile(req.body , (error , results)=>{
        if(error){
            return res.status(400).send({
                message : "error",
                data : error,
            });
        }
        return res.status(200).send({
            message : "Success",
            data : results,
        });
    })
}

exports.sendEmail= (req , res , next)=>{
    otpService.sendEmail(req.body , (error , results)=>{
        if(error){
            return res.status(400).send({
                message : "error",
                data : error,
            });
        }
        return res.status(200).send({
            message : "Success",
            data : results,
        });
    })
}