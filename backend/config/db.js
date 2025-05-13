const mongoose=require("mongoose");


const connectdb =async ()=>{
try{

    const conn= await mongoose.connect(process.env.Mongo_URI );
    console.log(`Mongodb Connected :${conn.connection.host}`);
}
catch(error){
    console.log(`Error:${error.message}`);
    process.exit();
}
};


module.exports =connectdb;
