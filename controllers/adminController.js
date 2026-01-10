const users =require('../models/userModel')

exports.getUsers = async(req, res) => {
  try {
    const allUsers = await users.find({role:{$ne:'Admin'}});
    res.status(200).json({messsage:"users found",allUsers});
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getbooks = async(req, res) => {
  try {
    const allbooks= await users.find({role:{$ne:'Admin'}});
    res.status(200).json({messsage:"books found",allbooks});
  } catch (error) {
    res.status(500).json(error);
  }
};