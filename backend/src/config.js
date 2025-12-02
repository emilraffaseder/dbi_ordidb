import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import mysql from "mysql2/promise";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Prisma instance (relational DB) – weiterhin für Seeding etc.
export const prisma = new PrismaClient();

// High‑performance MySQL‑Pool für die Benchmarks (Raw SQL)
export const mysqlPool = mysql.createPool(process.env.DATABASE_URL);

// Connect to MongoDB
export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
}
