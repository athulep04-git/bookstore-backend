const books = require("../models/bookModel")

exports.addBook=async(req,res)=>{
    console.log("inside add book");
    console.log(req.body);
    const {title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category}=req.body
    //image file to filename
    console.log(req.files);// image files [{....},{},{}]
    const UploadedImages=[]
    req.files.map(item=>UploadedImages.push(item.filename))
    console.log(UploadedImages);//[img,img,img]
    //get user mail from JWT verification
    const userMail=req.payload
    console.log(userMail);

    try{
        const existingBook=await books.findOne({title,userMail})
        if(existingBook){
            res.status(402).json("Book already exist")
        }
        else{
            const newBook=new books({title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,UploadedImages,userMail})
            await newBook.save()
            res.status(200).json("Add book success")
        }
    }
    catch (error) {
     res.status(500).json(error);
}   
    // res.send("Request Recieved") 
}

//get all books
exports.getBooks = async(req, res) => {
  try {
    const allBooks = await books.find();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get latest 4 books
exports.latestbooks= async(req,res)=>{
    try {
    const latestBooks = await books.find().sort({_id: -1 }).limit(4);
    res.status(200).json(latestBooks);
  } catch (error) {
    res.status(500).json(error);
  } 
};

