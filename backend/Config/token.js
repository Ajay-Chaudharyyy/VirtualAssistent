const jwt = require("jsonwebtoken")
exports.genToken=async(userId)=>{
    try{
        const token =  jwt.sign({userId},process.env.JWT_SECRET, {expiresIn:"3h"})

        return token;
    }catch(err)
    {
        console.log("Error -> ",err.message);
    }
}