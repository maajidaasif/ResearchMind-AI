import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function DashboardNavbar() {

  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.full_name || "Researcher";

  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {

    localStorage.clear();

    toast.success("Logged out successfully");

    navigate("/");

  };

  const handleSearch = (e) => {

    setSearch(e.target.value);

  };

  const handleSearchEnter = (e) => {

    if (e.key !== "Enter") return;

    const value = search.trim().toLowerCase();

    switch (value) {

      case "dashboard":
        navigate("/dashboard");
        break;

      case "upload":
      case "upload papers":
        navigate("/upload");
        break;

      case "papers":
      case "my papers":
        navigate("/papers");
        break;

      case "history":
      case "analysis":
      case "analysis history":
        navigate("/history");
        break;

      case "profile":
        navigate("/profile");
        break;

      case "settings":
        navigate("/settings");
        break;

      case "help":
        navigate("/help");
        break;

      default:
        toast.error("No matching page found.");
    }

    setSearch("");

  };

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {

        setShowProfileMenu(false);

      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {

        setShowNotifications(false);

      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {

        setShowProfileMenu(false);
        setShowNotifications(false);

      }

    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);

  }, []);

  return (
    <header className="h-20 bg-[#081028] border-b border-slate-800 flex items-center justify-between px-8">

  {/* Search */}

  <div className="relative w-[430px]">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      type="text"
      value={search}
      onChange={handleSearch}
      onKeyDown={handleSearchEnter}
      placeholder="Search Dashboard, Upload, Profile..."
      className="w-full bg-[#111C44] text-white pl-12 pr-4 py-3 rounded-2xl border border-slate-700 outline-none focus:border-indigo-500 transition-all"
    />

  </div>

  {/* Right Section */}

  <div className="flex items-center gap-6">

    {/* Notification */}

    <div
      ref={notificationRef}
      className="relative"
    >

      <button
        onClick={() => {

          setShowNotifications(!showNotifications);
          setShowProfileMenu(false);

        }}
        className="relative hover:scale-110 transition"
      >

        <Bell
          size={24}
          className="text-slate-300 hover:text-white"
        />

        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>

      </button>

      {showNotifications && (

        <div className="absolute right-0 mt-4 w-80 rounded-2xl border border-slate-700 bg-[#111C44] shadow-2xl z-50 overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-700">

            <h2 className="text-white font-semibold text-lg">

              Notifications

            </h2>

          </div>

          <div className="p-5 space-y-4">

            <div className="bg-[#081028] rounded-xl p-4">

              <p className="text-white font-medium">

                🎉 Login Successful

              </p>

              <p className="text-slate-400 text-sm mt-1">

                Welcome back to ResearchMind AI.

              </p>

            </div>

            <div className="bg-[#081028] rounded-xl p-4">

              <p className="text-white font-medium">

                🧠 Local AI Status

              </p>

              <p className="text-green-400 text-sm mt-1">

                Local LLM Ready

              </p>

            </div>

            <div className="bg-[#081028] rounded-xl p-4">

              <p className="text-white font-medium">

                📄 Papers

              </p>

              <p className="text-slate-400 text-sm mt-1">

                No papers uploaded yet.

              </p>

            </div>

          </div>

        </div>

      )}

    </div>

    {/* Profile */}

    <div
      ref={profileRef}
      className="relative"
    >

      <button
        onClick={() => {

          setShowProfileMenu(!showProfileMenu);
          setShowNotifications(false);

        }}
        className="flex items-center gap-3 hover:bg-[#111C44] px-3 py-2 rounded-xl transition-all"
      >

        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">

          {firstLetter}

        </div>

        <div className="text-left">

          <h3 className="text-white font-semibold">

            {userName}

          </h3>

          <p className="text-xs text-slate-400">

            Researcher

          </p>

        </div>

        <ChevronDown
          size={18}
          className="text-slate-400"
        />

      </button>

      {showProfileMenu && (

        <div className="absolute right-0 mt-4 w-64 rounded-2xl bg-[#111C44] border border-slate-700 shadow-2xl overflow-hidden z-50">

          <button
            onClick={() => {

              setShowProfileMenu(false);

              navigate("/profile");

            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 text-white transition"
          >

            <User size={18} />

            My Profile

          </button>

          <button
            onClick={() => {

              setShowProfileMenu(false);

              navigate("/settings");

            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 text-white transition"
          >

            <Settings size={18} />

            Settings

          </button>

          <hr className="border-slate-700" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-600 text-red-400 hover:text-white transition"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      )}

    </div>

  </div>

</header>

  );

}

export default DashboardNavbar;