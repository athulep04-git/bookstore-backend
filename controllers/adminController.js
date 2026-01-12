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

exports.updateAdmin=async(req,res)=>{
  console.log("inside admin controller");
  //get body
  const {username,password,bio,profile}=req.body
  //get email:payload
  const email=req.payload
  //get role
  const role=req.role
  //update profile photo:req.file
  const uploadedProfile=req.file?req.file.filename:profile
  try{
    const updateAdmin=await users.findOneAndUpdate({email},{username,email,password,profile:uploadedProfile,bio,role},{new:true})
    await updateAdmin.save()
    res.status(200).json({message:"Updated successfully...",updateAdmin})
    } catch (error) {
    res.status(500).json("error"+error);
  }
  
}

//update admin login
exports.updateAdminLogin = async(req, res) => {
  try {
    const admin = await users.findOne({role:{$eq:'Admin'}});
    res.status(200).json({messsage:"admin found",admin});
  } catch (error) {
    res.status(500).json(error);
  }
};