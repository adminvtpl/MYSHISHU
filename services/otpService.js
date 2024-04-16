const otpGenerator = require('otp-generator');
const http = require('http');

const sms360MarketingApiKey = "EBJFtN+czuq5sLkZE98wiYaBAdgUL10PR+fu3afztLQ=";
const sms360MarketingUsername = "myshishuapp";
const sms360MarketingPassword = "Myshishuapp@2024";
const a = false;
const crypto =require('crypto');
const key ="2edr4edfgt5432qwse34";
const emailService = require('../services/emailService')

function sendSMS(phoneNumber, message, callback) {
    const url = `http://164.52.205.46:6005/api/v2/SendSMS?SenderId=MYSISU&Is_Unicode=false&Is_Flash=false&Message=${message}&MobileNumbers=${phoneNumber}&ApiKey=EBJFtN%2Bczuq5sLkZE98wiYaBAdgUL10PR%2Bfu3afztLQ%3D&ClientId=267a8363-98a4-4111-b673-d5c4334d288e`;

    const options = {
        method: 'GET',
        agent: false,
       
    };

    http.get(url, options, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        res.on('end', () => {
            // Parse the response or handle errors as needed.
            try {
                const response = JSON.parse(data);
                callback(null, response);
            } catch (parseError) {
                callback(parseError, null);
            }
        });
    }).on('error', (error) => {
        callback(error, null);
    });
}






async function sendOTP(params , callback){
    const otp =otpGenerator.generate(
        4,{
            digits : true,
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false ,
            specialChars : false
        }
    );
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${params.email}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    var otpMessage = `Dear Parent,\n${otp} is the one time password for your login to MyShishu.\nRegaurds,\nTeam MyShishu`;
    var model ={
        email : params.email,
        subject : "Registeration OTP",
        body : otpMessage
    };
    emailService.sendEmail(
        model,(error , result)=>{
            if(error){
                return callback(error);
            }
            return callback(null , fullHash);

        }
    )
}


async function sendOTPonmobile(params , callback){
    const otp =otpGenerator.generate(
        4,{
            digits : true,
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false ,
            specialChars : false
        }
    );
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${params.phone}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    var otpMessage = `Dear Customer,Your otp is ${otp} `;
    console.log(`Dear Customer, ${otp} is the one time password for your login to MyShishu.\nRegaurds,\nTeam MyShishu`);
    
    sendSMS(params.phone, `Dear Customer, ${otp} is the one time password for your login to MyShishu.\nRegaurds,\nTeam MyShishu`, (error, response) => {
        if (error) {
            console.error("Error sending SMS:", error);
        } else {
            console.log("SMS sent successfully:", response);
        }
    });


  
   
            return callback(null , fullHash);

     
}


async function verifyOTP(params , callback){
    let [hashValue , expires]= params.hash.split('.');
    let now = Date.now();
    if(now > parseInt(expires)){
     return callback("otp expired");
    }
    let data = `${params.email}.${params.otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
    if(newCalculatedHash == hashValue ){
      return callback(null , "Success");

    }
    return callback("Invalid otp");

}



async function verifyOTPonMobile(params , callback){
    let [hashValue , expires]= params.hash.split('.');
    let now = Date.now();
    if(now > parseInt(expires)){
     return callback("otp expired");
    }
    let data = `${params.phone}.${params.otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
    if(newCalculatedHash == hashValue ){
      return callback(null , "Success");

    }
    return callback("Invalid otp");

}

async function sendEmail(params , callback){
    
   
    var otpMessage = `Dear Customer,\nYou are sucessfully registered at MyShishu.\n\nYour details of registeration are as follows: \n\nEmail: ${params.email}\nPassword: ${params.password}\n\nBest Regaurds\nTeam MyShishu`;
    var model ={
        email : params.email,
        subject : "Sucessfully Registered",
        body : otpMessage
    };
    emailService.sendEmail(
        model,(error , result)=>{
            if(error){
                return callback(error);
            }
            return callback(null , otpMessage);

        }
    )
}

async function coursePurchased(params , callback){
    
   
    var otpMessage = `Course has sucessfully been purchased.\n\nCourse Title: ${params.courseTitle}\nPhone: ${params.phone}\nPrice: ${params.price}\nrazorpay_payment_id: ${params.razorpay_payment_id}\n\nMyShishu app`;
    var model ={
        email : params.email,
        subject : "Course Purchased",
        body : otpMessage
    };
    emailService.sendEmail(
        model,(error , result)=>{
            if(error){
                return callback(error);
            }
            return callback(null , otpMessage);

        }
    )
}

async function Feedback(params , callback){
    
   
    var otpMessage = `Following feedback has been given by user\nPhone Number:${params.phone}\nfeedback: ${params.feedback}`;
    var model ={
        email : params.email,
        subject : "Users Feedback",
        body : otpMessage
    };
    emailService.sendEmail(
        model,(error , result)=>{
            if(error){
                return callback(error);
            }
            return callback(null , otpMessage);

        }
    )
}



module.exports = {
    sendOTP , verifyOTP , sendEmail , sendOTPonmobile , verifyOTPonMobile, coursePurchased,Feedback
}
