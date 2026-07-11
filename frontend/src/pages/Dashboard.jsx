import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Dashboard() {

  const navigate = useNavigate();

  // Logged In User
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.full_name || "Researcher";

  // Greeting
  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // Dashboard Statistics
  const [totalPapers, setTotalPapers] = useState(0);

  const totalAnalysis =
    JSON.parse(localStorage.getItem("analysis"))?.length || 0;

  const totalReports =
    JSON.parse(localStorage.getItem("reports"))?.length || 0;

  // Load Total Papers from Backend
  const loadDashboard = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/papers"
      );

      const data = await response.json();

      setTotalPapers(data.length);

    } catch (error) {

      console.log("Dashboard Error:", error);

    }

  };

  useEffect(() => {

    loadDashboard();

  }, []);

  return (

    <MainLayout>

      {/* Hero Section */}

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold text-white">

          {greeting},{" "}

          <span className="text-yellow-300">

            {userName}

          </span>

          👋

          <p className="text-white mt-5 text-lg">

            Ready to continue your research today?

          </p>

        </h1>

        <p className="text-white mt-5 text-lg">

          Ready to continue your research today?

        </p>

        <p className="text-indigo-100 mt-4 text-lg max-w-3xl leading-8">

          Welcome to

          <span className="font-semibold">

            {" "}ResearchMind AI{" "}

          </span>

          — your AI-powered research assistant.

          Upload research papers, generate literature surveys,

          discover research gaps and interact with your

          Local AI powered by RAG.

        </p>

        <div className="flex gap-5 mt-10">

          <button
            onClick={() => navigate("/upload")}
            className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:scale-105 transition"
          >

            Upload Papers

          </button>

          <button
            onClick={() => navigate("/papers")}
            className="border border-white text-white px-8 py-3 rounded-xl hover:bg-white hover:text-indigo-700 transition"
          >

            My Papers

          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        <div className="bg-[#111C44] rounded-3xl p-6 border border-slate-700">

          <p className="text-slate-400">

            Total Papers

          </p>

          <h2 className="text-5xl text-white font-bold mt-4">

            {totalPapers}

          </h2>

          <p className="text-slate-500 mt-3">

            Uploaded PDFs

          </p>

        </div>

        <div className="bg-[#111C44] rounded-3xl p-6 border border-slate-700">

          <p className="text-slate-400">

            AI Analyses

          </p>

          <h2 className="text-5xl text-white font-bold mt-4">

            {totalAnalysis}

          </h2>

          <p className="text-slate-500 mt-3">

            Completed

          </p>

        </div>

        <div className="bg-[#111C44] rounded-3xl p-6 border border-slate-700">

          <p className="text-slate-400">

            Reports

          </p>

          <h2 className="text-5xl text-white font-bold mt-4">

            {totalReports}

          </h2>

          <p className="text-slate-500 mt-3">

            Generated

          </p>

        </div>

        <div className="bg-[#111C44] rounded-3xl p-6 border border-slate-700">

          <p className="text-slate-400">

            AI Status

          </p>

          <h2 className="text-3xl text-green-400 font-bold mt-4">

            Ready

          </h2>

          <p className="text-slate-500 mt-3">

            Local AI Available

          </p>

        </div>

      </div>

      {/* Start Research */}

      {totalPapers === 0 && (

        <div className="mt-8 bg-[#111C44] border border-slate-700 rounded-3xl p-8">

          <h3 className="text-2xl font-semibold text-white">

            🚀 Start Your Research

          </h3>

          <p className="text-slate-400 mt-3">

            Upload your first research paper to begin AI-powered analysis,
            discover research gaps and generate literature surveys.

          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-semibold"
          >

            Upload First Paper

          </button>

        </div>

      )}

      {/* Quick Actions */}

      <h2 className="text-white text-3xl font-bold mt-14 mb-6">

        Quick Actions

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <button
          onClick={() => navigate("/upload")}
          className="bg-[#111C44] rounded-3xl border border-slate-700 p-7 text-left hover:border-indigo-500 hover:scale-105 transition duration-300"
        >

          <h2 className="text-xl font-semibold text-white">

            📄 Upload Papers

          </h2>

          <p className="text-slate-400 mt-3">

            Upload one or more research papers.

          </p>

        </button>

        <button
          onClick={() => navigate("/papers")}
          className="bg-[#111C44] rounded-3xl border border-slate-700 p-7 text-left hover:border-indigo-500 hover:scale-105 transition duration-300"
        >

          <h2 className="text-xl font-semibold text-white">

            📚 My Papers

          </h2>

          <p className="text-slate-400 mt-3">

            View all uploaded research papers.

          </p>

        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-[#111C44] rounded-3xl border border-slate-700 p-7 text-left hover:border-indigo-500 hover:scale-105 transition duration-300"
        >

          <h2 className="text-xl font-semibold text-white">

            📊 Analysis History

          </h2>

          <p className="text-slate-400 mt-3">

            Review previous AI analyses.

          </p>

        </button>

        <button
          onClick={() => navigate("/upload")}
          className="bg-[#111C44] rounded-3xl border border-slate-700 p-7 text-left hover:border-indigo-500 hover:scale-105 transition duration-300"
        >

          <h2 className="text-xl font-semibold text-white">

            🚀 Start New Analysis

          </h2>

          <p className="text-slate-400 mt-3">

            Begin a new AI-powered research workflow.

          </p>

        </button>

      </div>

      {/* Recent Activity */}

      <div className="mt-14">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-white text-3xl font-bold">

            Recent Activity

          </h2>

          <button
            onClick={() => navigate("/history")}
            className="text-indigo-400 hover:text-indigo-300 transition"
          >

            View History

          </button>

        </div>

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-12 text-center">

          <h3 className="text-2xl font-semibold text-white">

            No Recent Activity

          </h3>

          <p className="text-slate-400 mt-4">

            Your uploaded papers, AI analyses and generated reports
            will appear here.

          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-semibold"
          >

            Upload Your First Paper

          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;