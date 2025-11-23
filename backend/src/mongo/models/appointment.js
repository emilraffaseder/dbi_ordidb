import mongoose from "mongoose";

const DiagnosisSchema = new mongoose.Schema({
  description: { type: String, required: true },
  severity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  spezialisierung: { type: String, required: true }
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const AppointmentSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true },
  doctor: { type: DoctorSchema, required: true },
  patient: { type: PatientSchema, required: true },
  diagnoses: { type: [DiagnosisSchema], default: [] }
});

// Name der Collection = "appointments"
export const Appointment = mongoose.model("Appointment", AppointmentSchema);
