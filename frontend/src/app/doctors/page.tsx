"use client";
import { useEffect, useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  location: string;
  availability: string; // e.g., "Monday,Wednesday,Friday"
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };

    fetchDoctors();
  }, []);

  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => {
          const isAvailableToday = doc.availability.includes(today);
          const status =
            doc.availability.toLowerCase() === "off"
              ? "Off Duty"
              : isAvailableToday
              ? "Available"
              : "Busy";

          const statusColor =
            status === "Available"
              ? "text-green-400"
              : status === "Busy"
              ? "text-yellow-400"
              : "text-red-400";

          return (
            <div
              key={doc.id}
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow-sm hover:shadow-lg hover:border-b-4 hover:border-teal-400 transition-all duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-teal-400 mb-2">
                {doc.name}
              </h2>
              <p className="text-gray-300">
                Specialization: {doc.specialization}
              </p>
              <p className="text-gray-300">Location: {doc.location}</p>
              <p className={`font-semibold mt-2 ${statusColor}`}>
                Status: {status}
              </p>
              <button className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded">
                View Schedule
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
