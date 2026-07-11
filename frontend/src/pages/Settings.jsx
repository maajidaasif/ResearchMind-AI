import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  User,
  Bell,
  Moon,
  Sun,
  Info,
  Lock,
} from "lucide-react";

function Settings() {

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? true
  );

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {

      document.documentElement.classList.add("dark");

    } else {

      document.documentElement.classList.remove("dark");

    }

  }, [darkMode]);

  useEffect(() => {

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

  }, [notifications]);

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold text-white mb-8">

        Settings

      </h1>

      <div className="space-y-6">

        {/* Account */}

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-8">

          <div className="flex items-center gap-4">

            <User
              className="text-indigo-400"
              size={30}
            />

            <div>

              <h2 className="text-2xl font-semibold text-white">

                Account Information

              </h2>

              <p className="text-slate-400 mt-3">

                <span className="text-white">

                  Name :

                </span>{" "}

                {user.full_name}

              </p>

              <p className="text-slate-400">

                <span className="text-white">

                  Email :

                </span>{" "}

                {user.email}

              </p>

              <p className="text-slate-400">

                <span className="text-white">

                  Role :

                </span>{" "}

                Researcher

              </p>

            </div>

          </div>

        </div>

        {/* Theme */}

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-8">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">

              {darkMode ? (

                <Moon
                  size={28}
                  className="text-indigo-400"
                />

              ) : (

                <Sun
                  size={28}
                  className="text-yellow-400"
                />

              )}

              <div>

                <h2 className="text-2xl text-white font-semibold">

                  Theme

                </h2>

                <p className="text-slate-400 mt-2">

                  {darkMode
                    ? "Dark Mode Enabled"
                    : "Light Mode Enabled"}

                </p>

              </div>

            </div>

            <button

              onClick={() =>
                setDarkMode(!darkMode)
              }

              className={`w-16 h-8 rounded-full transition flex items-center px-1 ${
                darkMode
                  ? "bg-indigo-600 justify-end"
                  : "bg-slate-500 justify-start"
              }`}

            >

              <div className="w-6 h-6 rounded-full bg-white"></div>

            </button>

          </div>

        </div>

        {/* Notifications */}

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-8">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">

              <Bell
                size={28}
                className="text-indigo-400"
              />

              <div>

                <h2 className="text-2xl text-white font-semibold">

                  Notifications

                </h2>

                <p className="text-slate-400 mt-2">

                  {notifications
                    ? "Enabled"
                    : "Disabled"}

                </p>

              </div>

            </div>

            <button

              onClick={() =>
                setNotifications(!notifications)
              }

              className={`w-16 h-8 rounded-full transition flex items-center px-1 ${
                notifications
                  ? "bg-green-600 justify-end"
                  : "bg-slate-500 justify-start"
              }`}

            >

              <div className="w-6 h-6 rounded-full bg-white"></div>

            </button>

          </div>

        </div>

        {/* Password */}

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-8">

          <div className="flex items-center gap-4">

            <Lock
              size={28}
              className="text-indigo-400"
            />

            <div>

              <h2 className="text-2xl text-white font-semibold">

                Password

              </h2>

              <p className="text-slate-400 mt-2">

                Password management will be
                available in Module 3.

              </p>

            </div>

          </div>

        </div>

        {/* About */}

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-8">

          <div className="flex items-center gap-4">

            <Info
              size={28}
              className="text-indigo-400"
            />

            <div>

              <h2 className="text-2xl text-white font-semibold">

                About ResearchMind AI

              </h2>

              <p className="text-slate-400 mt-2">

                Version 1.0.0

              </p>

              <p className="text-slate-500">

                Local LLM + RAG Research Assistant

              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Settings;