const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadImage = async(req,res)=>{
    // console.log(req.files.image)
    if (!req.files) {
      throw new CustomError.BadRequestError('No File Uploaded');
    }
    if (!req.files.image.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload Image');
    }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,{
        use_filename:true,
        folder:'digitalWorkerPortofolio'
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json(result.secure_url)
}

module.exports = {uploadImage}