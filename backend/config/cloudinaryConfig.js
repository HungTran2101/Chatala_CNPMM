require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dapbgcbjp', 
    api_key: '591675771353332', 
    api_secret: 'KL-4K-8RSgcejVt50UDVKqMIKpM' 
  });

module.exports = { cloudinary };