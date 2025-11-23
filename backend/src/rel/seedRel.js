import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed(count) {
  console.log(`Seeding relational DB with ${count} appointments...`);

  // --- Doctors ---
  const doctors = [];
  for (let i = 0; i < 20; i++) {
    doctors.push(
      await prisma.doctor.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          spezialisierung: faker.person.jobType(),
        },
      })
    );
  }

  // --- Patients ---
  const patients = [];
  for (let i = 0; i < 50; i++) {
    patients.push(
      await prisma.patient.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        },
      })
    );
  }

  // --- Appointments + Diagnosen ---
  for (let i = 0; i < count; i++) {
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const patient = patients[Math.floor(Math.random() * patients.length)];

    const appointment = await prisma.appointment.create({
      data: {
        dateTime: faker.date.soon(),
        doctorId: doctor.id,
        patientId: patient.id,
      },
    });

    // zufällige Anzahl Diagnosen: 0–3
    const diagnosesCount = Math.floor(Math.random() * 4);

    for (let j = 0; j < diagnosesCount; j++) {
      await prisma.diagnosis.create({
        data: {
          description: faker.lorem.sentence(),
          severity: faker.number.int({ min: 1, max: 10 }),
          appointmentId: appointment.id,
        },
      });
    }

    if (i % 1000 === 0) {
      console.log(`Inserted ${i} appointments...`);
    }
  }

  console.log("Done.");
}

const count = parseInt(process.argv[2] || "1000");
seed(count)
  .then(() => process.exit(0))
  .catch((err) => console.error(err));
