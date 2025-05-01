const API_URL = "http://localhost:8080";

export async function createPatient(patientData) {
  const response = await fetch(`${API_URL}/patients/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  });
  return await response.json();
}

export async function getPatients() {
  const response = await fetch(`${API_URL}/patients/`);
  return await response.json();
}

export async function createAppointment(appointmentData) {
  const response = await fetch(`${API_URL}/appointments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });
  return await response.json();
}

export async function getAppointments(patientId) {
  const response = await fetch(`${API_URL}/appointments/patient/${patientId}`);
  return await response.json();
}
