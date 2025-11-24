import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config.js";
import { connectMongo } from "./config.js";
import { appointmentRouter } from "./routes/appointmentRoutes.js";
import { Appointment } from "./mongo/models/appointment.js";
import { benchmarkRouter } from "./routes/benchmarkRoutes.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/benchmark", benchmarkRouter);

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
app.get("/test/mongo", async (req, res) => {
  try {
    const appointments = await Appointment.find().limit(5);
    res.json({ ok: true, appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/appointments", appointmentRouter);

// -----------------------------
// Server Start
// -----------------------------
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
