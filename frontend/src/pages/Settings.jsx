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
  // Logged-in user
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  /*
    Default = Dark Mode

    lightMode false → Dark Mode
    lightMode true  → Light Mode
  */
  const [lightMode, setLightMode] = useState(
    JSON.parse(
      localStorage.getItem("lightMode")
    ) ?? false
  );

  // Notification preference
  const [notifications, setNotifications] =
    useState(
      JSON.parse(
        localStorage.getItem("notifications")
      ) ?? true
    );

  // Apply Light / Dark Theme
  useEffect(() => {
    localStorage.setItem(
      "lightMode",
      JSON.stringify(lightMode)
    );

    if (lightMode) {
      document.documentElement.classList.add(
        "light"
      );
    } else {
      document.documentElement.classList.remove(
        "light"
      );
    }
  }, [lightMode]);

  // Save Notification Preference
  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  return (
    <MainLayout>

      {/* Page Title */}

      <h1
        className="
          text-4xl
          font-bold
          mb-8
          text-[var(--primary-text)]
        "
      >
        Settings
      </h1>

      <div className="space-y-6">

        {/* Account Information */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-8
            transition-colors
            duration-300
          "
        >

          <div className="flex items-center gap-4">

            <User
              size={30}
              className="text-[var(--secondary-text)]"
            />

            <div>

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-[var(--primary-text)]
                "
              >
                Account Information
              </h2>

              <p
                className="
                  text-[var(--secondary-text)]
                  mt-3
                "
              >
                <span
                  className="
                    text-[var(--primary-text)]
                    font-medium
                  "
                >
                  Name :
                </span>{" "}

                {user.full_name || "Researcher"}
              </p>

              <p className="text-[var(--secondary-text)]">

                <span
                  className="
                    text-[var(--primary-text)]
                    font-medium
                  "
                >
                  Email :
                </span>{" "}

                {user.email || "Not available"}
              </p>

              <p className="text-[var(--secondary-text)]">

                <span
                  className="
                    text-[var(--primary-text)]
                    font-medium
                  "
                >
                  Role :
                </span>{" "}

                Researcher
              </p>

            </div>

          </div>

        </div>

        {/* Theme */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-8
            transition-colors
            duration-300
          "
        >

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">

              {lightMode ? (

                <Sun
                  size={28}
                  className="text-[var(--primary-text)]"
                />

              ) : (

                <Moon
                  size={28}
                  className="text-[var(--primary-text)]"
                />

              )}

              <div>

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-[var(--primary-text)]
                  "
                >
                  Theme
                </h2>

                <p
                  className="
                    text-[var(--secondary-text)]
                    mt-2
                  "
                >
                  {lightMode
                    ? "Light Mode Enabled"
                    : "Dark Mode Enabled"}
                </p>

              </div>

            </div>

            {/* Theme Switch */}

            <button
              type="button"
              onClick={() =>
                setLightMode(!lightMode)
              }
              aria-label="Toggle theme"
              className={`
                w-16
                h-8
                rounded-full
                transition-all
                duration-300
                flex
                items-center
                px-1
                ${
                  lightMode
                    ? "bg-black justify-end"
                    : "bg-neutral-700 justify-start"
                }
              `}
            >

              <div
                className={`
                  w-6
                  h-6
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    lightMode
                      ? "bg-white"
                      : "bg-white"
                  }
                `}
              />

            </button>

          </div>

        </div>

        {/* Notifications */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-8
            transition-colors
            duration-300
          "
        >

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">

              <Bell
                size={28}
                className="text-[var(--secondary-text)]"
              />

              <div>

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-[var(--primary-text)]
                  "
                >
                  Notifications
                </h2>

                <p
                  className="
                    text-[var(--secondary-text)]
                    mt-2
                  "
                >
                  {notifications
                    ? "Enabled"
                    : "Disabled"}
                </p>

              </div>

            </div>

            {/* Notification Switch */}

            <button
              type="button"
              onClick={() =>
                setNotifications(!notifications)
              }
              aria-label="Toggle notifications"
              className={`
                w-16
                h-8
                rounded-full
                transition-all
                duration-300
                flex
                items-center
                px-1
                ${
                  notifications
                    ? "bg-[var(--button-bg)] justify-end"
                    : "bg-neutral-500 justify-start"
                }
              `}
            >

              <div
                className={`
                  w-6
                  h-6
                  rounded-full
                  ${
                    notifications
                      ? "bg-[var(--button-text)]"
                      : "bg-white"
                  }
                `}
              />

            </button>

          </div>

        </div>

        {/* Password */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-8
            transition-colors
            duration-300
          "
        >

          <div className="flex items-center gap-4">

            <Lock
              size={28}
              className="text-[var(--secondary-text)]"
            />

            <div>

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-[var(--primary-text)]
                "
              >
                Password
              </h2>

              <p
                className="
                  text-[var(--secondary-text)]
                  mt-2
                "
              >
                Password management will be
                available in Module 3.
              </p>

            </div>

          </div>

        </div>

        {/* About */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-8
            transition-colors
            duration-300
          "
        >

          <div className="flex items-center gap-4">

            <Info
              size={28}
              className="text-[var(--secondary-text)]"
            />

            <div>

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-[var(--primary-text)]
                "
              >
                About ResearchMind AI
              </h2>

              <p
                className="
                  text-[var(--secondary-text)]
                  mt-2
                "
              >
                Version 1.0.0
              </p>

              <p className="text-[var(--muted-text)]">

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