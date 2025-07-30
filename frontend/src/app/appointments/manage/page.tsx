"use client";
import { useEffect, useState } from "react";

type Doctor = {
  id: number;
  name: string;
  availability: string;
};

type Appointment = {
  id: number;
  patientName: string;
  timeSlot: string;
  date: string;
  status: string;
  doctor: Doctor;
};

export default function AppointmentManagePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/appointments")
      .then((res) => res.json())
      .then(setAppointments);
    fetch("http://localhost:4000/doctors")
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  const cancelAppointment = async (id: number) => {
    await fetch(`http://localhost:4000/appointments/${id}`, {
      method: "DELETE",
    });
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
        Appointment Management
      </h1>

      <h2 className="text-2xl font-semibold mb-4">Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-400 italic">No appointments found.</p>
      ) : (
        <ul className="space-y-4 mb-10">
          {appointments.map((a) => (
            <li
              key={a.id}
              className="p-5 bg-[#1e1e1e] rounded-lg border border-gray-700 hover:border-purple-500 transition"
            >
              <div className="mb-2">
                <p>
                  <span className="font-semibold text-white">{a.patientName}</span> with{" "}
                  <span className="text-purple-400">{a.doctor.name}</span>
                </p>
                <p className="text-sm text-gray-400">
                  {a.date} — {a.timeSlot}
                </p>
                <p className="text-sm text-yellow-400">Status: {a.status}</p>
              </div>
              <button
                onClick={() => cancelAppointment(a.id)}
                className="mt-2 inline-block text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
}
