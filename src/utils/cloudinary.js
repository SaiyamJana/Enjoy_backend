import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File uploaded successfully on Cloudinary" , response.url);
        return response;
    } catch (error){
        //it is in server , we have to unlink the file from server storage
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.log("Error while uploading file on Cloudinary" , error);
        return null;
    } finally {
        // Clean up local file after upload attempt
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlink(localFilePath, (err) => {
                if (err) {
                    console.error("Error while deleting local file:", err);
                } else {
                    console.log("Local file deleted successfully");
                }
            });
        }
    }
}

export {uploadOnCloudinary}