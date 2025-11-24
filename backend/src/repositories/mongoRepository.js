import { Appointment } from "../mongo/models/appointment.js";

export class MongoRepository {
  // Create many appointments (bulk insert → very fast)
  async createMany(appointments) {
    return Appointment.insertMany(appointments);
  }

  // READ operations
  async findAll() {
    return Appointment.find();
  }

  async findWithFilter(filter) {
    return Appointment.find(filter);
  }

  async findWithFilterProjection(filter, projection) {
    return Appointment.find(filter).select(projection);
  }

  async findWithFilterProjectionSort(filter, projection, sort) {
    return Appointment.find(filter).select(projection).sort(sort);
  }

  // UPDATE
  async updateAppointment(id, data) {
    return Appointment.findByIdAndUpdate(id, data, { new: true });
  }

  // DELETE
  async deleteAppointment(id) {
    return Appointment.findByIdAndDelete(id);
  }
}
