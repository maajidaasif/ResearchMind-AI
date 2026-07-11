import {
  LayoutDashboard,
  Upload,
  FolderOpen,
  History,
  Settings,
  CircleHelp,
  BrainCircuit,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const userName =
    user?.full_name || "Researcher";

  const firstLetter =
    userName.charAt(0).toUpperCase();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-[#111C44] hover:text-white"
    }`;

  return (

    <aside className="w-72 min-h-screen bg-[#081028] border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="p-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">

            <BrainCircuit
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              ResearchMind
            </h1>

            <p className="text-sm text-slate-400">
              AI Research Platform
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-5 space-y-2">

        <NavLink
          to="/dashboard"
          className={menuClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/upload"
          className={menuClass}
        >
          <Upload size={20} />
          Upload Papers
        </NavLink>

        <NavLink
          to="/papers"
          className={menuClass}
        >
          <FolderOpen size={20} />
          My Papers
        </NavLink>

        <NavLink
          to="/history"
          className={menuClass}
        >
          <History size={20} />
          Analysis History
        </NavLink>

        <div className="border-t border-slate-800 my-5"></div>

        <NavLink
          to="/settings"
          className={menuClass}
        >
          <Settings size={20} />
          Settings
        </NavLink>

        <NavLink
          to="/help"
          className={menuClass}
        >
          <CircleHelp size={20} />
          Help & Support
        </NavLink>

      </nav>

      {/* User Card */}

      <div className="px-5 pb-4">

        <div className="bg-[#111C44] rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">

              {firstLetter}

            </div>

            <div>

              <h3 className="text-white font-semibold">

                {userName}

              </h3>

              <p className="text-slate-400 text-sm">

                Researcher

              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

     {/* Footer */}

<div className="p-6 text-center border-t border-slate-800">

  <p className="text-white font-semibold">

    ResearchMind AI v1.0.0

  </p>

  <p className="text-slate-500 text-sm mt-2">

    Built with React + Flask

  </p>

  <p className="text-slate-600 text-xs mt-3">

    © 2026 All Rights Reserved

  </p>

</div>
    </aside>

  );

}

export default Sidebar;