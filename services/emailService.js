var nodemailer = require('nodemailer');
async function sendEmail(params , callback){
    const transporter = nodemailer.createTransport({
         host: 'mail.myshishu.in',
         port: 465,
      //  service: 'gmail',
        auth: {
            user: 'admin@myshishu.in',
            pass: 'App231!@#',
          
        }
    });
    var mailOptions = {
      from : 'admin@myshishu.in',
      to : params.email,
      subject : params.subject,
      text : params.body,
    };
    transporter.sendMail(mailOptions , function(error , info){
        if(error){
            return callback(error);
        }
        else{
            return callback(null , info.response);
        }
    })
}
module.exports ={
    sendEmail
}