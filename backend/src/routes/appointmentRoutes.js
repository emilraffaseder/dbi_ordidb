import express from "express";
import { getRepository } from "../repositories/repositoryFactory.js";

export const appointmentRouter = express.Router();

/**
 * HELPER:
 * Repository auswählen: rel oder mongo
 */
function repo(req) {
  return getRepository(req.query.db || "rel");
}


/* ======================================================
   CREATE APPOINTMENT
   POST /appointments?db=rel
   POST /appointments?db=mongo
   ====================================================== */
appointmentRouter.post("/", async (req, res) => {
  try {
    const repository = repo(req);
    const data = req.body;

    // In beiden DBs verwenden wir dieselbe Struktur:
    // {
    //   dateTime: "...",
    //   doctorId: ... (nur rel)
    //   patientId: ... (nur rel)
    //   doctor: {...} (mongo)
    //   patient: {...} (mongo)
    //   diagnoses: [...]
    // }

    const result = await repository.createMany([data]); // create 1 item
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ======================================================
   READ ALL APPOINTMENTS
   GET /appointments?db=rel
   GET /appointments?db=mongo
   ====================================================== */
appointmentRouter.get("/", async (req, res) => {
  try {
    const repository = repo(req);
    const result = await repository.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ======================================================
   READ ONE APPOINTMENT BY ID
   GET /appointments/:id?db=rel
   GET /appointments/:id?db=mongo
   ====================================================== */
appointmentRouter.get("/:id", async (req, res) => {
  try {
    const repository = repo(req);
    const id = req.params.id;

    const result = await repository.findWithFilter({ id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ======================================================
   UPDATE APPOINTMENT
   PUT /appointments/:id?db=rel
   PUT /appointments/:id?db=mongo
   ====================================================== */
appointmentRouter.put("/:id", async (req, res) => {
  try {
    const repository = repo(req);
    const id = req.params.id;
    const data = req.body;

    const result = await repository.updateAppointment(id, data);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ======================================================
   DELETE APPOINTMENT
   DELETE /appointments/:id?db=rel
   DELETE /appointments/:id?db=mongo
   ====================================================== */
appointmentRouter.delete("/:id", async (req, res) => {
  try {
    const repository = repo(req);
    const id = req.params.id;

    const result = await repository.deleteAppointment(id);
    res.json({ deleted: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
