const bookModel = require("../models/bookModel")

exports.addBook=async(req,res)=>{
    console.log("inside add book");
    res.send("Request Recieved")
    
}


// exports.addBook=async(req,res)=>{
//     const {title,author,category}=req.body;
//     try{
//         const existingBook=await Book.findOne({title})
//         if(existingBook){
//             res.status(400).json("Book already exist")
//         }
//         else{
//             const newBook= new Book({title,author,category})
//             await newBook.save()
//             res.status(200).json({message:"Add book success",newBook})

//         }
//     }
//     catch (error) {
//      res.status(500).json(error);
// }
// }