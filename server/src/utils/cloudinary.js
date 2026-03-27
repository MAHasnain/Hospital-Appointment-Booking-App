import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

export default uploadOnCloudinary;

// import { v2 as cloudinary } from "cloudinary";

// import fs from "fs";
// import logger from "../../logger/winston.logger.js";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// const uploadOnCloudinary = async (localFilePath) => {
//     try {

//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })

//         logger.info("response: ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {

//         fs.unlinkSync(localFilePath);
//         return null;

//     }
// }

// export default uploadOnCloudinary;
