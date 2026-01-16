const books = require("../models/bookModel")
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.paymentkey);
//123
const stripe = require('stripe')(process.env.paymentkey);
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
  console.log(req.query);
  console.log(req.query.search);
  searchKey =req.query.search
  
  try {
    const query={
      title:{
        $regex:searchKey,
        $options:'i'
      }
    }
    const allBooks = await books.find(query);
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

//view details of a single selected book
exports.viewbook=async(req,res)=>{
  console.log(req.params);
  const {id}=req.params
  try{
      const bookdata=await books.findOne({_id:id})
      if(!bookdata){
        res.status(401).json("book not found")
      }
      else
        res.status(200).json({message:"book found",bookdata})    
        }
  catch(error){
    res.status(500).json(error);
  }
  
}

exports.buyBook=async(req,res)=>{
  console.log("inside payment");
  const {bookDetails}=req.body
  email=req.payload.userMail
  try{
    const existingBook=await books.findByIdAndUpdate(bookDetails._id,{
      title:bookDetails.title,
      author:bookDetails.author,
      noofpages:bookDetails.noofpages,
      imageUrl:bookDetails.imageUrl,
      price:bookDetails.price,
      dprice:bookDetails.dprice,
      abstract:bookDetails.abstract,
      publisher:bookDetails.publisher,
      language:bookDetails.language,
      isbn:bookDetails.isbn,
      category:bookDetails.category,
      UploadedImages:bookDetails.UploadedImages,
      status:"sold",
      userMail:bookDetails.userMail,
      brought:email
    },
    {new:true}
  )
  const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookDetails.title,
            description: `${bookDetails.author} | ${bookDetails.publisher}`,
            images: [bookDetails.imageUrl],
            metadata: {
              title: bookDetails.title,
              author: bookDetails.author,
              noofpages: bookDetails.noofpages,
              imageUrl: bookDetails.imageUrl,
              price: bookDetails.price,
              dprice: bookDetails.dprice,
              abstract: bookDetails.abstract,
              publisher: bookDetails.publisher,
              language: bookDetails.language,
              isbn: bookDetails.isbn,
              category: bookDetails.category,
              UploadedImages: bookDetails.UploadedImages,
              status: "sold",
              userMail: bookDetails.userMail,
              brought: email,
            },
          },
          unit_amount: Math.round(Number(bookDetails.dprice) * 100),
        },
        quantity: 1,
      },
    ];
  const session = await stripe.checkout.sessions.create({
  payment_method_types:['card'],
  success_url: 'https://bookstore-backend-1-lfsh.onrender.com/payment-success',
  cancel_url:'https://bookstore-backend-1-lfsh.onrender.com/payment-error',
  line_items,
  mode: 'payment',
});
    res.status(200).json({message:"success",session,sessionID:session.id})

  }
  catch(error)
  {
    res.status(500).json("error"+error)
    
  }
  
}