const express=require('express')
const userController = require('../controllers/userController')
const bookController=require('../controllers/bookController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')
const router=express.Router()
router.post('/api/register',userController.userRegister)
router.post('/api/login',userController.userLogin)
router.post('/api/googlelogin',userController.googleUserLogin)
router.post('/api/addbook',jwtMiddleware,multerConfig.array('UploadedImages',3),bookController.addBook)
router.get('/api/getbooks', jwtMiddleware,bookController.getBooks);
router.get('/api/latestbooks', bookController.latestbooks);


module.exports=router