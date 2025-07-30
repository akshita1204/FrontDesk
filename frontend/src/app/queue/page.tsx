"use client";
import { useEffect, useState } from "react";

type QueueItem = {
  id: number;
  patientName: string;
  doctor: { id: number; name: string };
  arrivalTime: string;
  status: "Waiting" | "With Doctor" | "Completed";
  urgency: "Normal" | "Urgent";
};

type Doctor = {
  id: number;
  name: string;
};

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [arrivalTime, setArrivalTime] = useState("");
  const [urgency, setUrgency] = useState<"Normal" | "Urgent">("Normal");

  useEffect(() => {
    fetch("http://localhost:4000/queue")
      .then((res) => res.json())
      .then(setQueue)
      .catch((err) => console.error("Failed to fetch queue", err));

    fetch("http://localhost:4000/doctors")
      .then((res) => res.json())
      .then(setDoctors)
      .catch((err) => console.error("Failed to fetch doctors", err));
  }, []);

  const updateStatus = (id: number, status: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: status as QueueItem["status"] } : q))
    );
  };

  const updateUrgency = (id: number, urgency: string) => {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, urgency: urgency as QueueItem["urgency"] } : q))
    );
  };

  const removeFromQueue = (id: number) => {
    fetch(`http://localhost:4000/queue/${id}`, { method: "DELETE" });
    setQueue((prev) => prev.filter((q) => q.id !== id));
  };

  const addToQueue = async () => {
    if (!newPatientName || !selectedDoctor || !arrivalTime) return;

    const newItem = {
      patientName: newPatientName,
      timeSlot: "10:00AM - 11:00AM",
      date: new Date().toISOString().split("T")[0],
      doctorId: selectedDoctor,
    };

    const res = await fetch("http://localhost:4000/queue/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    const added = await res.json();

    setQueue((prev) => [...prev, added]);
    setNewPatientName("");
    setSelectedDoctor(null);
    setArrivalTime("");
    setUrgency("Normal");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Queue Management</h1>

      <ul className="space-y-4 mb-8">
        {queue.map((q, i) => (
          <li
            key={q.id}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between hover:border-teal-400 transition"
          >
            <div className="mb-3 md:mb-0">
              <p className="text-lg font-semibold">
                {i + 1}. {q.patientName}
                {q.urgency === "Urgent" && (
                  <span className="ml-2 text-red-500">⚠️</span>
                )}
              </p>
              <p className="text-sm text-gray-400">
                {q.status === "With Doctor" ? (
                  <span className="text-blue-400">🩺 With Doctor</span>
                ) : (
                  <span className="text-yellow-400">⏳ Waiting</span>
                )}
              </p>
            </div>

            <div className="text-sm text-gray-400 md:text-right mb-3 md:mb-0">
              <p>
                Arrival: {q.arrivalTime} — Est. Wait:{" "}
                {q.status === "With Doctor"
                  ? "0 min"
                  : q.urgency === "Urgent"
                  ? "5 min"
                  : "15 min"}
              </p>
              <p>Doctor: {q.doctor.name}</p>
            </div>

            <div className="flex gap-3 items-center">
              <select
                className="bg-zinc-700 text-white rounded px-2 py-1"
                value={q.status}
                onChange={(e) => updateStatus(q.id, e.target.value)}
              >
                <option>Waiting</option>
                <option>With Doctor</option>
                <option>Completed</option>
              </select>

              <select
                className="bg-zinc-700 text-white rounded px-2 py-1"
                value={q.urgency}
                onChange={(e) => updateUrgency(q.id, e.target.value)}
              >
                <option>Normal</option>
                <option>Urgent</option>
              </select>

              <button
                onClick={() => removeFromQueue(q.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add New Patient */}
      <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-teal-400">Add New Patient</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={newPatientName}
            onChange={(e) => setNewPatientName(e.target.value)}
            className="bg-zinc-700 text-white px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Arrival Time (e.g. 10:30 AM)"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="bg-zinc-700 text-white px-3 py-2 rounded"
          />
          <select
            value={selectedDoctor || ""}
            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
            className="bg-zinc-700 text-white px-3 py-2 rounded"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as "Normal" | "Urgent")}
            className="bg-zinc-700 text-white px-3 py-2 rounded"
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
          <button
            onClick={addToQueue}
            className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded text-white font-semibold"
          >
            Add to Queue
          </button>
        </div>
      </div>
    </div>
  );
}
