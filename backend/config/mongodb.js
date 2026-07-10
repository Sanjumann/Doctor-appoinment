import mongoose from "mongoose";
import { seedDoctors } from "./seed.js";

let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    let useMemoryServer = false;
    
    if (!uri || uri.includes("your_mongodb_connection_string") || uri.includes("placeholder") || uri.trim() === "") {
      useMemoryServer = true;
    } else {
      if (!uri.includes("/appointy")) {
        const queryIndex = uri.indexOf('?');
        if (queryIndex !== -1) {
          uri = uri.slice(0, queryIndex) + 'appointy' + uri.slice(queryIndex);
        } else {
          if (uri.endsWith('/')) {
            uri = uri.slice(0, -1);
          }
          uri = `${uri}/appointy`;
        }
      }
    }

    if (useMemoryServer) {
      console.log("No MongoDB URI provided. Starting an in-memory MongoDB database...");
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`In-memory MongoDB started at: ${uri}`);
    }

    try {
      await mongoose.connect(uri);
      console.log("Database Connected");
      await seedDoctors();
    } catch (connectionError) {
      if (!useMemoryServer) {
        console.warn("Failed to connect to the provided MONGODB_URI:", connectionError.message);
        console.warn("Falling back to an in-memory MongoDB database...");
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        console.log(`In-memory MongoDB started at: ${uri}`);
        await mongoose.connect(uri);
        console.log("Database Connected (In-Memory Fallback)");
        await seedDoctors();
      } else {
        throw connectionError;
      }
    }
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
