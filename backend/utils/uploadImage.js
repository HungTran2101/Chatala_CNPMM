const {cloudinary} = require('../config/cloudinaryConfig');

const uploadImage = async (file) => {
    const uploadResponse = await cloudinary.uploader.upload(file);
    return uploadResponse.secure_url;
}