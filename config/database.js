import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // If the database is already connected, do not connect again
    if (connected) {
        console.log('MongoDB is already connected...');
        return
    }

    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB connected...');
    } catch (error) {
        console.log('error while connecting to the MongoDB', error);
    } 
}

export default connectDB;