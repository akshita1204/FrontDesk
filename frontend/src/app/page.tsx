export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-4 py-12">
      <h1 className="text-5xl font-bold text-green-400 mb-4">Clinic Front Desk System</h1>
      <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl">
        Welcome to the smart clinic management portal. Choose an option to proceed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <a
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 transition rounded-xl p-6 shadow-md text-center"
        >
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-sm text-gray-200 mt-2">Overview of clinic operations</p>
        </a>

        <a
          href="/queue"
          className="bg-yellow-600 hover:bg-yellow-700 transition rounded-xl p-6 shadow-md text-center"
        >
          <h2 className="text-2xl font-semibold">Queue Management</h2>
          <p className="text-sm text-gray-200 mt-2">Manage patient queues and statuses</p>
        </a>

        <a
          href="/doctors"
          className="bg-purple-600 hover:bg-purple-700 transition rounded-xl p-6 shadow-md text-center"
        >
          <h2 className="text-2xl font-semibold">Available Doctors</h2>
          <p className="text-sm text-gray-200 mt-2">View doctor schedules and availability</p>
        </a>
      </div>

  
    </main>
  );
}

