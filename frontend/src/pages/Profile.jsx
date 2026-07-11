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
    JSON.parse(localStorage.getItem("user")) || {};

  const firstLetter =
    (user.full_name || "R").charAt(0).toUpperCase();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold text-white">

        My Profile

      </h1>

      <p className="text-slate-400 mt-3">

        Manage your ResearchMind AI account.

      </p>

      {/* Profile Card */}

      <div className="mt-10 bg-[#111C44] rounded-3xl border border-slate-700 p-10">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl">

            {firstLetter}

          </div>

          <h2 className="text-3xl font-bold text-white mt-6">

            {user.full_name}

          </h2>

          <p className="text-slate-400 mt-2">

            Researcher

          </p>

        </div>

        {/* Information */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-[#081028] rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <User
                className="text-indigo-400"
                size={22}
              />

              <span className="text-white font-semibold">

                Full Name

              </span>

            </div>

            <p className="text-slate-400 mt-3">

              {user.full_name}

            </p>

          </div>

          <div className="bg-[#081028] rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <Mail
                className="text-indigo-400"
                size={22}
              />

              <span className="text-white font-semibold">

                Email

              </span>

            </div>

            <p className="text-slate-400 mt-3">

              {user.email}

            </p>

          </div>

          <div className="bg-[#081028] rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <ShieldCheck
                className="text-green-400"
                size={22}
              />

              <span className="text-white font-semibold">

                Role

              </span>

            </div>

            <p className="text-slate-400 mt-3">

              Researcher

            </p>

          </div>

          <div className="bg-[#081028] rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <Calendar
                className="text-yellow-400"
                size={22}
              />

              <span className="text-white font-semibold">

                Member Since

              </span>

            </div>

            <p className="text-slate-400 mt-3">

              July 2026

            </p>

          </div>

        </div>

        {/* Logout */}

        <div className="mt-10 text-center">

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2"
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