const express = require('express');
const router = express.Router();
const upload = require('../../services/file-upload')
const roles = require('../../utils/roles');

const singleImageUpload = upload.single('image');

router.post("/",  roles.isAdmin, (req,res, next) => {
  singleImageUpload(req,res, (err) => {
    if(err) return console.log(err)
    console.log(req.file);
    return res.json({'imageUrl': req.file.location})
  })
})
module.exports = router;
