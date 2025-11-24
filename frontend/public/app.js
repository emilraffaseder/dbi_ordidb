async function loadAppointments() {
  const db = document.getElementById("db").value;
  const res = await fetch(`http://localhost:3000/appointments?db=${db}`);
  const json = await res.json();
  document.getElementById("output").value = JSON.stringify(json, null, 2);
}

async function createAppointment() {
  const db = document.getElementById("db").value;

  const example = {
    dateTime: new Date().toISOString(),
    doctorId: 1,
    patientId: 1,
    doctor: { name: "Dr Test", email: "test@test.com", spezialisierung: "Cardio" },
    patient: { name: "Patient", email: "p@test.com" },
    diagnoses: [{ description: "Husten", severity: 3 }]
  };

  const res = await fetch(`http://localhost:3000/appointments?db=${db}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(example)
  });

  const json = await res.json();
  document.getElementById("output").value = JSON.stringify(json, null, 2);
}
