const mongoose=require('mongoose');
const db=process.env.MONGODB_URI;

// setting the connection of mongodb atlas

const connectDB=async()=>{
    try{
        await mongoose.connect(db);
        console.log(`MongoDB connected..`);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports=connectDB;