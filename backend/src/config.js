import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Prisma instance (relational DB)
export const prisma = new PrismaClient();

// Connect to MongoDB
export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
}
