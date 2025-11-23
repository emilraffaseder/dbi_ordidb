import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Appointment } from "./models/appointment.js";
import dotenv from "dotenv";
dotenv.config();


async function seed(count) {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Seeding MongoDB with ${count} appointments...`);

  const doctors = [];
  for (let i = 0; i < 20; i++) {
    doctors.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      spezialisierung: faker.person.jobType(),
    });
  }

  const patients = [];
  for (let i = 0; i < 50; i++) {
    patients.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }

  const bulk = [];

  for (let i = 0; i < count; i++) {
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const patient = patients[Math.floor(Math.random() * patients.length)];

    const diagnosesCount = Math.floor(Math.random() * 4);
    const diagnoses = [];

    for (let j = 0; j < diagnosesCount; j++) {
      diagnoses.push({
        description: faker.lorem.sentence(),
        severity: faker.number.int({ min: 1, max: 10 }),
      });
    }

    bulk.push({
      dateTime: faker.date.soon(),
      doctor,
      patient,
      diagnoses,
    });

    if (bulk.length === 1000) {
      await Appointment.insertMany(bulk);
      bulk.length = 0;
      console.log(`Inserted ${i} appointments...`);
    }
  }

  if (bulk.length > 0) {
    await Appointment.insertMany(bulk);
  }

  console.log("MongoDB seed completed.");
  process.exit(0);
}

const count = parseInt(process.argv[2] || "1000");
seed(count).catch(console.error);
