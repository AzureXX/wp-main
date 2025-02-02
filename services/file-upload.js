const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('file.invalid'), false);
  }
}
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: "pandar",
    acl: "public-read",
    metadata(req, file, cb)  {
      cb(null, {fieldName: file.fieldname});
    },
    key(req, file, cb) {
      cb(null, Date.now().toString()+".png")
    }
  })
})

module.exports = upload;