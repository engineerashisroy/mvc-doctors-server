import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(`Mongodb connection succefully: ${connect.connection.host}`);
  } catch (error) {
    console.log("Mongodb connection error", error);
    process.exit(1);
  }
};
export default connectDB;
