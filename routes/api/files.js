const express = require('express');
// custom modules
const upload = require('../../services/file-upload');
const roles = require('../../utils/roles');

const singleImageUpload = upload.single('image');

const router = express.Router();
// @route   POST api/files
// @desc    Upload image
// @access  Private/Admin
router.post('/', roles.isAdmin, (req, res, next) => {
  singleImageUpload(req, res, err => {
    if (err) return console.log(err);
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
