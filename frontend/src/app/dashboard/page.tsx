"use client";
import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  patientName: string;
  doctor: { name: string };
  date: string;
  timeSlot: string;
  status: string;
};

type Doctor = {
  id: number;
  name: string;
};

const timeSlots = [
  "09:00AM - 10:00AM",
  "10:00AM - 11:00AM",
  "11:00AM - 12:00PM",
  "12:00PM - 01:00PM",
  "02:00PM - 03:00PM",
  "03:00PM - 04:00PM",
];

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newPatient, setNewPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:4000/appointments")
      .then((res) => res.json())
      .then(setAppointments)
      .catch((err) => console.error("Failed to fetch appointments:", err));

    fetch("http://localhost:4000/doctors")
      .then((res) => res.json())
      .then(setDoctors)
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, []);

  const scheduleAppointment = async () => {
    if (!newPatient || !selectedDoctor || !selectedTime) {
      alert("Please fill all fields: name, doctor, and time.");
      return;
    }

    const newAppointment = {
      patientName: newPatient,
      patientContact: "9999999999",
      timeSlot: selectedTime,
      date: new Date().toISOString().split("T")[0],
      doctorId: selectedDoctor,
    };

    try {
      const res = await fetch("http://localhost:4000/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error creating appointment:", errorText);
        alert("Failed to schedule: " + errorText);
        return;
      }

      const created = await res.json();
      setAppointments((prev) => [...prev, created]);
      setNewPatient("");
      setSelectedDoctor(null);
      setSelectedTime("");
    } catch (err) {
      console.error("Error in request:", err);
      alert("Network error while scheduling.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-3">
          Appointments
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Patient Name"
            value={newPatient}
            onChange={(e) => setNewPatient(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded text-white border border-zinc-600"
          />
          <select
            value={selectedDoctor ?? ""}
            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
            className="bg-zinc-800 px-3 py-2 rounded text-white border border-zinc-600"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded text-white border border-zinc-600"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <button
            className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded"
            onClick={scheduleAppointment}
          >
            Schedule New
          </button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-400 text-lg">No appointments found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((a, index) => (
            <div
              key={a.id ?? `${a.patientName}-${a.date}-${index}`}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-b-4 hover:border-teal-400 transition-all duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-teal-400 mb-2">
                {a.patientName}
              </h2>
              <p className="text-sm text-gray-400 mb-1">
                <span className="text-white">Doctor:</span> {a.doctor?.name}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <span className="text-white">Date:</span> {a.date}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <span className="text-white">Time:</span> {a.timeSlot}
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-white">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    a.status === "booked"
                      ? "text-green-400"
                      : a.status === "cancelled"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {a.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
