

const fs= require("fs");
const cloudinary = require("cloudinary").v2;

exports.cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

exports.uploadImage = async (filePath,folder) =>{
    try{
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: auto
        })
        
        return result.secure_url;
    } catch(err)
    {
        console.error("Cloudinary upload error:", err);
        throw new Error("Image upload failed");
    }
    finally{
        fs.unlinkSync(filePath)
    }
}