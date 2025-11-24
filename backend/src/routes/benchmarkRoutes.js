import express from "express";
import { getRepository } from "../repositories/repositoryFactory.js";

export const benchmarkRouter = express.Router();

function repo(req) {
  return getRepository(req.query.db || "rel");
}

// helper for timing
function measureTime(fn) {
  const start = performance.now();
  return fn().then((result) => {
    const end = performance.now();
    return { result, ms: end - start };
  });
}

/* ======================================================
   1) WRITE TEST
   /benchmark/write?count=100&db=rel
   ====================================================== */
benchmarkRouter.get("/write", async (req, res) => {
  const count = Number(req.query.count || 100);
  const db = req.query.db || "rel";
  const repository = repo(req);

  // generate mock appointments
  const appointments = [];
  for (let i = 0; i < count; i++) {
    appointments.push({
      dateTime: new Date().toISOString(),
      doctorId: 1,
      patientId: 1,
      diagnoses: [{ description: "Test", severity: 2 }]
    });
  }

  const result = await measureTime(() => repository.createMany(appointments));

  res.json({
    operation: "write",
    count,
    db,
    ms: result.ms
  });
});


/* ======================================================
   2) FIND TESTS
   /benchmark/find1?db=rel
   ====================================================== */
benchmarkRouter.get("/find1", async (req, res) => {
  const repository = repo(req);
  const result = await measureTime(() => repository.findAll());

  res.json({
    operation: "find_all",
    db: req.query.db,
    ms: result.ms
  });
});

/* find2 – with filter */
benchmarkRouter.get("/find2", async (req, res) => {
  const repository = repo(req);

  const filter = { "diagnoses.severity": 2 }; // mongo ok, mysql interpretiert bei 1:n: alternative patterns möglich
  const result = await measureTime(() => repository.findWithFilter(filter));

  res.json({
    operation: "find_with_filter",
    db: req.query.db,
    ms: result.ms
  });
});

/* find3 – with filter + projection */
benchmarkRouter.get("/find3", async (req, res) => {
  const repository = repo(req);

  const filter = {};
  const projection = { dateTime: true, diagnoses: true };

  const result = await measureTime(() =>
    repository.findWithFilterProjection(filter, projection)
  );

  res.json({
    operation: "find_with_projection",
    db: req.query.db,
    ms: result.ms
  });
});

/* find4 – filter + projection + sort */
benchmarkRouter.get("/find4", async (req, res) => {
  const repository = repo(req);

  const filter = {};
  const projection = { dateTime: true, diagnoses: true };
  const sort = { dateTime: "asc" };

  const result = await measureTime(() =>
    repository.findWithFilterProjectionSort(filter, projection, sort)
  );

  res.json({
    operation: "find_sorted",
    db: req.query.db,
    ms: result.ms
  });
});


/* ======================================================
   3) UPDATE TEST
   /benchmark/update?id=123&db=rel
   ====================================================== */
benchmarkRouter.get("/update", async (req, res) => {
  const repository = repo(req);
  const id = req.query.id;

  const result = await measureTime(() =>
    repository.updateAppointment(id, {
      dateTime: new Date().toISOString()
    })
  );

  res.json({
    operation: "update",
    db: req.query.db,
    ms: result.ms
  });
});


/* ======================================================
   4) DELETE TEST
   /benchmark/delete?id=123&db=rel
   ====================================================== */
benchmarkRouter.get("/delete", async (req, res) => {
  const repository = repo(req);
  const id = req.query.id;

  const result = await measureTime(() =>
    repository.deleteAppointment(id)
  );

  res.json({
    operation: "delete",
    db: req.query.db,
    ms: result.ms
  });
});
