const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");


const signedFileUrl = asyncHandler(async (req, res, next) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.status(200).json({
    signature: signature,
    timestamp: timestamp,
  });
});

module.exports = { signedFileUrl };