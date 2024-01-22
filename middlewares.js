// const { decode } = require('jsonwebtoken');
// const jwt = require('jsonwebtoken')
// const config = require('./config')
// const checkToken =(req , res , next)=>{
//     let token = req.headers["authorization"];
//     token = token.slice(7 , token.length);
    
//     if(token){
//         jwt.verify(token , config.secretkey , (err , decode)=>{
//             if(err){
//                 return res.json({status : false , msg : "token is invalid"})
//             }
//             else{
//                 req.decode = decode;
//                 console.log()
//                 next();
//             }

//         })
//     }
//     else{
//         return res.json({status : false , msg : "token is not provided"})
//     }
    
// }
// module.exports={
//     checkToken : checkToken 
// }
const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken')
const config = require('./config')

const checkToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        // Check if the token starts with "Bearer "
        if (token.startsWith("Bearer ")) {
            // Remove "Bearer " from the token
            token = token.slice(7, token.length);

            jwt.verify(token, config.secretkey, (err, decoded) => {
                if (err) {
                    return res.json({ status: false, msg: "Token is invalid" });
                } else {
                    req.decoded = decoded;
                    console.log(req.decoded.phone);
                    next();
                }
            });
        } else {
            return res.json({ status: false, msg: "Invalid token format" });
        }
    } else {
        return res.json({ status: false, msg: "Token is not provided" });
    }
}

module.exports = {
    checkToken: checkToken
}