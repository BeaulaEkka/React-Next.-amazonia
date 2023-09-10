import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      // process.env.MONGODB_URI
      "mongodb+srv://beaulabee:VhAKWkVL52iAaFqP@cluster0.pq1rrhc.mongodb.net/database"
    );
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("Error connecting  to MongoDB", error);
  }
};
