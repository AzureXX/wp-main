const express = require("express");
const router = express.Router();

router.get("/", async (req,res,next) => {
  try {
    res.json({name: "name"})
  } catch (error) {
    next(error);
  }
})

router.get("/a", async (req,res,next) => {
  next(new Error("Something went wrong"));
  
})

module.exports = router;