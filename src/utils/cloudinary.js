import cloudinary from 'cloudinary';
import env from './env.js';

// Функція для налаштування Cloudinary (викликається тільки при потребі)
const configureCloudinary = () => {
    const CLOUDINARY_NAME = env("CLOUDINARY_NAME");
    const CLOUDINARY_API_KEY = env("CLOUDINARY_API_KEY");
    const CLOUDINARY_API_SECRET = env("CLOUDINARY_API_SECRET");

    cloudinary.v2.config({
        secure: true,
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });
};

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 *
 * @async
 * @function saveToCloudinary
 * @param {Object} file - File object (from multer) to be uploaded.
 * @param {Buffer} file.buffer - The file buffer.
 * @param {string} file.originalname - The original name of the file.
 * @param {string} [folderName] - Optional Cloudinary folder name to store the file.
 *
 * @returns {Promise<string>} Resolves with the secure URL of the uploaded image.
 *
 * @throws {Error} Throws an error if the upload to Cloudinary fails.
 *
 * @example
 * const url = await saveToCloudinary(req.file, "cars");
 * console.log(url); // https://res.cloudinary.com/yourcloud/image/upload/v123456/cars/car.jpg
 */
const saveToCloudinary = async (file, folderName = "") => {
    configureCloudinary();
    
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            resource_type: "image",
        };
        if(folderName) uploadOptions.folder = folderName;
        const stream = cloudinary.v2.uploader.upload_stream( uploadOptions, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
        stream.end(file.buffer)
    });
}

export default saveToCloudinary;
