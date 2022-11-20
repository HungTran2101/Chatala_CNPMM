const { cloudinary } = require('../config/cloudinaryConfig');

const uploadImage = async file => {
  console.log('uploading');
  try {
    const uploadResponse = await cloudinary.uploader.upload(file);
    return uploadResponse.secure_url;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  uploadImage,
};
