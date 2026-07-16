import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  LogOut,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const firstLetter =
    (user.full_name || "R")
      .charAt(0)
      .toUpperCase();

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <MainLayout>

      {/* Header */}

      <h1 className="text-4xl font-bold text-[var(--primary-text)]">

        My Profile

      </h1>

      <p className="text-[var(--secondary-text)] mt-3">

        Manage your ResearchMind AI account.

      </p>

      {/* Profile Card */}

      <div
        className="
          mt-10
          bg-[var(--card-bg)]
          rounded-3xl
          border
          border-[var(--border-color)]
          p-10
          transition-colors
          duration-300
        "
      >

        {/* User */}

        <div className="flex flex-col items-center">

          <div
            className="
              w-28
              h-28
              rounded-full
              bg-[var(--button-bg)]
              text-[var(--button-text)]
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              border
              border-[var(--border-color)]
            "
          >

            {firstLetter}

          </div>

          <h2 className="text-3xl font-bold text-[var(--primary-text)] mt-6">

            {user.full_name ||
              "Researcher"}

          </h2>

          <p className="text-[var(--secondary-text)] mt-2">

            Researcher

          </p>

        </div>

        {/* Information */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {/* Full Name */}

          <div
            className="
              bg-[var(--card-hover)]
              border
              border-[var(--border-color)]
              rounded-2xl
              p-6
            "
          >

            <div className="flex items-center gap-3">

              <User
                className="text-[var(--primary-text)]"
                size={22}
              />

              <span className="text-[var(--primary-text)] font-semibold">

                Full Name

              </span>

            </div>

            <p className="text-[var(--secondary-text)] mt-3">

              {user.full_name ||
                "Researcher"}

            </p>

          </div>

          {/* Email */}

          <div
            className="
              bg-[var(--card-hover)]
              border
              border-[var(--border-color)]
              rounded-2xl
              p-6
            "
          >

            <div className="flex items-center gap-3">

              <Mail
                className="text-[var(--primary-text)]"
                size={22}
              />

              <span className="text-[var(--primary-text)] font-semibold">

                Email

              </span>

            </div>

            <p className="text-[var(--secondary-text)] mt-3">

              {user.email ||
                "No email available"}

            </p>

          </div>

          {/* Role */}

          <div
            className="
              bg-[var(--card-hover)]
              border
              border-[var(--border-color)]
              rounded-2xl
              p-6
            "
          >

            <div className="flex items-center gap-3">

              <ShieldCheck
                className="text-[var(--primary-text)]"
                size={22}
              />

              <span className="text-[var(--primary-text)] font-semibold">

                Role

              </span>

            </div>

            <p className="text-[var(--secondary-text)] mt-3">

              Researcher

            </p>

          </div>

          {/* Member Since */}

          <div
            className="
              bg-[var(--card-hover)]
              border
              border-[var(--border-color)]
              rounded-2xl
              p-6
            "
          >

            <div className="flex items-center gap-3">

              <Calendar
                className="text-[var(--primary-text)]"
                size={22}
              />

              <span className="text-[var(--primary-text)] font-semibold">

                Member Since

              </span>

            </div>

            <p className="text-[var(--secondary-text)] mt-3">

              July 2026

            </p>

          </div>

        </div>

        {/* Logout */}

        <div className="mt-10 text-center">

          <button
            onClick={logout}
            className="
              border
              border-red-500
              px-8
              py-3
              rounded-xl
              text-red-500
              font-semibold
              inline-flex
              items-center
              gap-2
              transition
              hover:bg-red-600
              hover:text-white
            "
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;