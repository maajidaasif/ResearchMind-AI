import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Upload,
  Library,
  History,
  Sparkles,
  FileText,
  BrainCircuit,
  FileOutput,
  ArrowRight,
  Plus,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  const navigate = useNavigate();

  // Logged-in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userName =
    user?.full_name || "Researcher";

  // Greeting based on current time
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
  const [totalPapers, setTotalPapers] =
    useState(0);

  const totalAnalysis =
    JSON.parse(
      localStorage.getItem("analysis")
    )?.length || 0;

  const totalReports =
    JSON.parse(
      localStorage.getItem("reports")
    )?.length || 0;

  // Load total papers from backend
  const loadDashboard = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/papers"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load papers"
        );
      }

      const data = await response.json();

      setTotalPapers(
        Array.isArray(data)
          ? data.length
          : 0
      );
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );

      setTotalPapers(0);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <MainLayout>

      {/* Welcome Section */}

      <section
        className="
          rounded-3xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          p-10
          transition-colors
          duration-300
        "
      >

        <div className="max-w-4xl">

          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--muted-text)]
            "
          >
            Research Workspace
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-semibold
              tracking-tight
              text-[var(--primary-text)]
              md:text-5xl
            "
          >
            {greeting}, {userName} 👋
          </h1>

          <p
            className="
              mt-5
              max-w-3xl
              text-lg
              leading-8
              text-[var(--secondary-text)]
            "
          >
            Upload research papers, organize your
            sources, generate literature surveys,
            discover research gaps, and work with
            your local AI research assistant.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={() =>
                navigate("/upload")
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[var(--button-bg)]
                px-6
                py-3
                font-semibold
                text-[var(--button-text)]
                transition
                hover:opacity-80
              "
            >

              <Plus size={19} />

              New Research

            </button>

            <button
              onClick={() =>
                navigate("/papers")
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--border-color)]
                bg-transparent
                px-6
                py-3
                font-semibold
                text-[var(--primary-text)]
                transition
                hover:bg-[var(--card-hover)]
              "
            >

              <Library size={19} />

              My Papers

            </button>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Total Papers */}

        <div
          className="
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-[var(--secondary-text)]">
              Total Papers
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <FileText
                size={20}
                className="text-[var(--primary-text)]"
              />

            </div>

          </div>

          <h2 className="mt-6 text-4xl font-semibold text-[var(--primary-text)]">

            {totalPapers}

          </h2>

          <p className="mt-2 text-sm text-[var(--muted-text)]">

            Uploaded research papers

          </p>

        </div>

        {/* AI Analyses */}

        <div
          className="
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-[var(--secondary-text)]">

              AI Analyses

            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <BrainCircuit
                size={20}
                className="text-[var(--primary-text)]"
              />

            </div>

          </div>

          <h2 className="mt-6 text-4xl font-semibold text-[var(--primary-text)]">

            {totalAnalysis}

          </h2>

          <p className="mt-2 text-sm text-[var(--muted-text)]">

            Completed analyses

          </p>

        </div>

        {/* Reports */}

        <div
          className="
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-[var(--secondary-text)]">

              Reports

            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <FileOutput
                size={20}
                className="text-[var(--primary-text)]"
              />

            </div>

          </div>

          <h2 className="mt-6 text-4xl font-semibold text-[var(--primary-text)]">

            {totalReports}

          </h2>

          <p className="mt-2 text-sm text-[var(--muted-text)]">

            Generated reports

          </p>

        </div>

        {/* AI Status */}

        <div
          className="
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-[var(--secondary-text)]">

              AI Status

            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <Sparkles
                size={20}
                className="text-[var(--primary-text)]"
              />

            </div>

          </div>

          <div className="mt-6 flex items-center gap-3">

            <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary-text)]" />

            <h2 className="text-2xl font-semibold text-[var(--primary-text)]">

              Ready

            </h2>

          </div>

          <p className="mt-2 text-sm text-[var(--muted-text)]">

            Local AI available

          </p>

        </div>

      </section>

      {/* Start Research */}

      {totalPapers === 0 && (

        <section
          className="
            mt-8
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-8
          "
        >

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <h2 className="text-2xl font-semibold text-[var(--primary-text)]">

                Start your research workspace

              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-[var(--secondary-text)]">

                Upload your first research paper to
                begin organizing sources and preparing
                for AI-powered research analysis.

              </p>

            </div>

            <button
              onClick={() =>
                navigate("/upload")
              }
              className="
                flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[var(--button-bg)]
                px-6
                py-3
                font-semibold
                text-[var(--button-text)]
                transition
                hover:opacity-80
              "
            >

              <Upload size={19} />

              Upload Paper

            </button>

          </div>

        </section>

      )}

      {/* Quick Actions */}

      <section className="mt-12">

        <div>

          <h2 className="text-2xl font-semibold text-[var(--primary-text)]">

            Quick Actions

          </h2>

          <p className="mt-2 text-sm text-[var(--muted-text)]">

            Access your main research tools.

          </p>

        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          {/* Upload Papers */}

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              group
              rounded-2xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              p-6
              text-left
              transition
              hover:bg-[var(--card-hover)]
            "
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <Upload
                size={21}
                className="text-[var(--primary-text)]"
              />

            </div>

            <h3 className="mt-6 text-lg font-semibold text-[var(--primary-text)]">

              Upload Papers

            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">

              Add one or more research papers to your workspace.

            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--secondary-text)]">

              Open

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />

            </div>

          </button>

          {/* My Papers */}

          <button
            onClick={() =>
              navigate("/papers")
            }
            className="
              group
              rounded-2xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              p-6
              text-left
              transition
              hover:bg-[var(--card-hover)]
            "
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <Library
                size={21}
                className="text-[var(--primary-text)]"
              />

            </div>

            <h3 className="mt-6 text-lg font-semibold text-[var(--primary-text)]">

              My Papers

            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">

              Browse and manage all uploaded research papers.

            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--secondary-text)]">

              Open

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />

            </div>

          </button>

          {/* Analysis History */}

          <button
            onClick={() =>
              navigate("/history")
            }
            className="
              group
              rounded-2xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              p-6
              text-left
              transition
              hover:bg-[var(--card-hover)]
            "
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <History
                size={21}
                className="text-[var(--primary-text)]"
              />

            </div>

            <h3 className="mt-6 text-lg font-semibold text-[var(--primary-text)]">

              Analysis History

            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">

              Review your previous AI research analyses.

            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--secondary-text)]">

              Open

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />

            </div>

          </button>

          {/* New Analysis */}

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              group
              rounded-2xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              p-6
              text-left
              transition
              hover:bg-[var(--card-hover)]
            "
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--card-hover)]">

              <Sparkles
                size={21}
                className="text-[var(--primary-text)]"
              />

            </div>

            <h3 className="mt-6 text-lg font-semibold text-[var(--primary-text)]">

              New Analysis

            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">

              Begin a new AI-powered research workflow.

            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--secondary-text)]">

              Start

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />

            </div>

          </button>

        </div>

      </section>

      {/* Recent Activity */}

      <section className="mt-12">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-[var(--primary-text)]">

              Recent Activity

            </h2>

            <p className="mt-2 text-sm text-[var(--muted-text)]">

              Your latest research activity will appear here.

            </p>

          </div>

          <button
            onClick={() =>
              navigate("/history")
            }
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[var(--secondary-text)]
              transition
              hover:text-[var(--primary-text)]
            "
          >

            View History

            <ArrowRight size={16} />

          </button>

        </div>

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            px-8
            py-14
            text-center
          "
        >

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--card-hover)]">

            <History
              size={25}
              className="text-[var(--secondary-text)]"
            />

          </div>

          <h3 className="mt-6 text-xl font-semibold text-[var(--primary-text)]">

            No recent activity

          </h3>

          <p className="mx-auto mt-3 max-w-lg leading-7 text-[var(--muted-text)]">

            Your uploaded papers, completed AI
            analyses, and generated research reports
            will appear here.

          </p>

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              mt-7
              rounded-xl
              border
              border-[var(--border-color)]
              px-6
              py-3
              font-medium
              text-[var(--primary-text)]
              transition
              hover:bg-[var(--card-hover)]
            "
          >

            Upload your first paper

          </button>

        </div>

      </section>

    </MainLayout>
  );
}

export default Dashboard;