const express= require("express");
const  {registerUser , authUser , allUsers} = require("../controllers/userControllers.js");
const { protect} =require("../middleware/authMiddleware.js");




const router = express.Router()

 router.route('/').post(registerUser);

// router.post('/', registerUser);
 router.post('/login', authUser);
 router.route("/").get( protect,allUsers);

module.exports=router;