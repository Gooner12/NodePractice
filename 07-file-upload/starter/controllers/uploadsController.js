const path = require('path');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const uploadProductImage = async(req, res) => {
    // check if file exists
    // console.log(req.files);
    if(!req.files) {
        throw new CustomError.BadRequestError('No file Uploaded');
    }

    const productImage = req.files.image;

    // checking if image has been uploaded    
    if(!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload an image');
    }

    // checking the image size
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image smaller than 1KB');
    }

    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`);

    await productImage.mv(imagePath);

    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
}


module.exports = { uploadProductImage};