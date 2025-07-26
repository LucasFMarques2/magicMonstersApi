const cloudinary = require('cloudinary').v2
const multer = require('multer')
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    streamifier.createReadStream(fileBuffer).pipe(uploadStream)
  })
}

const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

module.exports = { uploadToCloudinary, upload }
