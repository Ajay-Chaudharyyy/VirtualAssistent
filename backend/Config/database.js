const mongoose = require("mongoose");

const connectDb = async() =>{
    await mongoose.connect(process.env.DB_URL).then(()=>console.log("Database connected successfully")).catch((err)=>console.log("There is an error --> ",err.message))
};

module.exports = connectDb