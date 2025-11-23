import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config.js";
import { connectMongo } from "./config.js";

dotenv.config();

const app = express();
app.use(express.json());

// DB initialisieren
connectMongo();

// -----------------------------
// Test-Route für relationale DB
// -----------------------------
app.get("/test/rel", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      take: 5
    });
    res.json({ ok: true, doctors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Test-Route für MongoDB
// -----------------------------
import { Appointment } from "./mongo/models/appointment.js";

app.get("/test/mongo", async (req, res) => {
  try {
    const appointments = await Appointment.find().limit(5);
    res.json({ ok: true, appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Server Start
// -----------------------------
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
