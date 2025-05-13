const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema =mongoose.Schema(
    {
    name:{type:String , required:true},
    email:{type:String , required:true, unique:true},
    password:{type:String , required:true},
    pic:{type:String ,  default: "https://i.pinimg.com/236x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"},



    },
    {
      timestamps:true  
    }

);

userSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next()
  }

  const salt =await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword= async function(enteredPassword){
  return await bcrypt.compare(enteredPassword , this.password);
};

const User =mongoose.model("User", userSchema);

module.exports=User;