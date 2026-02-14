import mongoose from 'mongoose';


const connectDB = async (req , res) => { 
    try {
     
         await mongoose.connect(process.env.MONGODB_URI)   
         console.log('Connected to MongoDB');
    }catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
}

export default connectDB;