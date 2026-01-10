const users =require('../models/userModel')
const book = require('../models/bookModel')

exports.getUsers = async(req, res) => {
  try {
    const allUsers = await users.find({role:{$ne:'Admin'}});
    res.status(200).json({messsage:"users found",allUsers});
  } catch (error) {
    res.status(500).json(error);
  }
};

//no need of creating it use existing from bookcontroller
exports.getbooks = async(req, res) => {
  try {
    const allbooks= await book.find();
    res.status(200).json({messsage:"books found",allbooks});
  } catch (error) {
    res.status(500).json(error);
  }
};