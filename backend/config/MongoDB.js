import mongoose from 'mongoose';

const connectDb = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    });

    // Use backticks for string interpolation and correctly reference the environment variable
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
}

export default connectDb;
