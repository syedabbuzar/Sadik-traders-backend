import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      dbName: "sadik_traders",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB Connected");
  console.log("👉 DB:", cached.conn.connection.name);

  return cached.conn;       
};

export default connectDB;