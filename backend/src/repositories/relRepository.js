import { prisma } from "../config.js";

export class RelRepository {
  // Create many appointments (for write tests)
  async createMany(appointments) {
    for (const appt of appointments) {
      await prisma.appointment.create({
        data: {
          dateTime: appt.dateTime,
          doctorId: appt.doctorId,
          patientId: appt.patientId,
          diagnoses: {
            create: appt.diagnoses
          }
        }
      });
    }
  }

  // READ operations
  async findAll() {
    return prisma.appointment.findMany({
      include: {
        doctor: true,
        patient: true,
        diagnoses: true,
      },
    });
  }

  async findWithFilter(filter) {
    return prisma.appointment.findMany({
      where: filter,
      include: {
        doctor: true,
        patient: true,
        diagnoses: true,
      },
    });
  }

  async findWithFilterProjection(filter, projection) {
    return prisma.appointment.findMany({
      where: filter,
      select: projection,
    });
  }

  async findWithFilterProjectionSort(filter, projection, sort) {
    return prisma.appointment.findMany({
      where: filter,
      select: projection,
      orderBy: sort,
    });
  }

  // UPDATE
  async updateAppointment(id, data) {
    return prisma.appointment.update({
      where: { id: Number(id) },
      data,
    });
  }

  // DELETE
  async deleteAppointment(id) {
    return prisma.appointment.delete({
      where: { id: Number(id) },
    });
  }
}
