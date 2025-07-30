"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] p-8 rounded-xl shadow-xl w-full max-w-md border border-zinc-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center border-b border-zinc-600 pb-3">
          Clinic Login
        </h2>

        <input
          className="mb-4 w-full p-3 rounded bg-[#334155] text-white placeholder-gray-400 border border-[#475569] focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="mb-6 w-full p-3 rounded bg-[#334155] text-white placeholder-gray-400 border border-[#475569] focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-semibold transition-all duration-300 hover:border-b-4 hover:border-teal-300"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
