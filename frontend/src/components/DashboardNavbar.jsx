import {
  useState,
  useEffect,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  BrainCircuit,
  FileText,
} from "lucide-react";

function DashboardNavbar() {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [search, setSearch] = useState("");

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Logged-in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userName =
    user?.full_name || "Researcher";

  const firstLetter =
    userName.charAt(0).toUpperCase();

  // Logout
  const handleLogout = () => {
    localStorage.clear();

    toast.success(
      "Logged out successfully"
    );

    navigate("/");
  };

  // Search Input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Search Navigation
  const handleSearchEnter = (e) => {
    if (e.key !== "Enter") return;

    const value =
      search.trim().toLowerCase();

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
      case "my profile":
        navigate("/profile");
        break;

      case "settings":
        navigate("/settings");
        break;

      case "help":
      case "help support":
      case "help & support":
        navigate("/help");
        break;

      default:
        toast.error(
          "No matching page found."
        );
    }

    setSearch("");
  };

  // Close Popups When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfileMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Close Popups Using Escape Key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowProfileMenu(false);
        setShowNotifications(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <header
      className="
        h-20
        bg-[var(--navbar-bg)]
        border-b
        border-[var(--border-color)]
        flex
        items-center
        justify-between
        px-8
        transition-colors
        duration-300
      "
    >

      {/* Search */}

      <div className="relative w-[430px]">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[var(--muted-text)]
          "
        />

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleSearchEnter}
          placeholder="Search Dashboard, Upload, Profile..."
          className="
            w-full
            bg-[var(--input-bg)]
            text-[var(--primary-text)]
            placeholder:text-[var(--muted-text)]
            pl-12
            pr-4
            py-3
            rounded-xl
            border
            border-[var(--border-color)]
            outline-none
            focus:border-[var(--secondary-text)]
            transition-all
          "
        />

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            onClick={() => {
              setShowNotifications(
                !showNotifications
              );

              setShowProfileMenu(false);
            }}
            className="
              relative
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border-color)]
              text-[var(--secondary-text)]
              hover:bg-[var(--card-hover)]
              hover:text-[var(--primary-text)]
              transition
            "
          >

            <Bell size={21} />

            {/* Notification Indicator */}

            <span
              className="
                absolute
                top-2
                right-2
                w-2
                h-2
                rounded-full
                bg-[var(--primary-text)]
                border-2
                border-[var(--navbar-bg)]
              "
            />

          </button>

          {/* Notification Popup */}

          {showNotifications && (

            <div
              className="
                absolute
                right-0
                mt-3
                w-96
                rounded-2xl
                border
                border-[var(--border-color)]
                bg-[var(--card-bg)]
                shadow-2xl
                z-50
                overflow-hidden
              "
            >

              {/* Notification Header */}

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-[var(--border-color)]
                "
              >

                <h2
                  className="
                    text-[var(--primary-text)]
                    font-semibold
                    text-lg
                  "
                >
                  Notifications
                </h2>

                <p
                  className="
                    text-[var(--muted-text)]
                    text-sm
                    mt-1
                  "
                >
                  Latest updates from your workspace
                </p>

              </div>

              {/* Notification Items */}

              <div className="p-3 space-y-2">

                {/* Login Notification */}

                <div
                  className="
                    flex
                    gap-3
                    rounded-xl
                    p-4
                    hover:bg-[var(--card-hover)]
                    transition
                  "
                >

                  <div
                    className="
                      w-10
                      h-10
                      shrink-0
                      rounded-xl
                      bg-[var(--card-hover)]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <CheckCircle2
                      size={20}
                      className="text-[var(--primary-text)]"
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-[var(--primary-text)]
                        text-sm
                        font-medium
                      "
                    >
                      Login Successful
                    </p>

                    <p
                      className="
                        text-[var(--muted-text)]
                        text-sm
                        mt-1
                      "
                    >
                      Welcome back to ResearchMind AI.
                    </p>

                  </div>

                </div>

                {/* AI Status */}

                <div
                  className="
                    flex
                    gap-3
                    rounded-xl
                    p-4
                    hover:bg-[var(--card-hover)]
                    transition
                  "
                >

                  <div
                    className="
                      w-10
                      h-10
                      shrink-0
                      rounded-xl
                      bg-[var(--card-hover)]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <BrainCircuit
                      size={20}
                      className="text-[var(--primary-text)]"
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-[var(--primary-text)]
                        text-sm
                        font-medium
                      "
                    >
                      Local AI Status
                    </p>

                    <p
                      className="
                        text-[var(--muted-text)]
                        text-sm
                        mt-1
                      "
                    >
                      Local AI is ready.
                    </p>

                  </div>

                </div>

                {/* Research Papers */}

                <div
                  className="
                    flex
                    gap-3
                    rounded-xl
                    p-4
                    hover:bg-[var(--card-hover)]
                    transition
                  "
                >

                  <div
                    className="
                      w-10
                      h-10
                      shrink-0
                      rounded-xl
                      bg-[var(--card-hover)]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <FileText
                      size={20}
                      className="text-[var(--primary-text)]"
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-[var(--primary-text)]
                        text-sm
                        font-medium
                      "
                    >
                      Research Papers
                    </p>

                    <p
                      className="
                        text-[var(--muted-text)]
                        text-sm
                        mt-1
                      "
                    >
                      Your paper updates will appear here.
                    </p>

                  </div>

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
              setShowProfileMenu(
                !showProfileMenu
              );

              setShowNotifications(false);
            }}
            className="
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-xl
              hover:bg-[var(--card-hover)]
              transition-all
            "
          >

            {/* Avatar */}

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-[var(--button-bg)]
                text-[var(--button-text)]
                flex
                items-center
                justify-center
                font-semibold
              "
            >
              {firstLetter}
            </div>

            {/* User Information */}

            <div className="text-left">

              <h3
                className="
                  text-[var(--primary-text)]
                  text-sm
                  font-medium
                "
              >
                {userName}
              </h3>

              <p
                className="
                  text-xs
                  text-[var(--muted-text)]
                  mt-0.5
                "
              >
                Researcher
              </p>

            </div>

            <ChevronDown
              size={17}
              className={`
                text-[var(--muted-text)]
                transition-transform
                duration-200
                ${
                  showProfileMenu
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>

          {/* Profile Menu */}

          {showProfileMenu && (

            <div
              className="
                absolute
                right-0
                mt-3
                w-64
                rounded-2xl
                bg-[var(--card-bg)]
                border
                border-[var(--border-color)]
                shadow-2xl
                overflow-hidden
                z-50
              "
            >

              {/* User Header */}

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-[var(--border-color)]
                "
              >

                <p
                  className="
                    text-[var(--primary-text)]
                    text-sm
                    font-medium
                    truncate
                  "
                >
                  {userName}
                </p>

                <p
                  className="
                    text-[var(--muted-text)]
                    text-xs
                    mt-1
                    truncate
                  "
                >
                  {user?.email ||
                    "Researcher account"}
                </p>

              </div>

              {/* Menu Items */}

              <div className="p-2">

                {/* My Profile */}

                <button
                  onClick={() => {
                    setShowProfileMenu(false);

                    navigate("/profile");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[var(--secondary-text)]
                    hover:bg-[var(--card-hover)]
                    hover:text-[var(--primary-text)]
                    transition
                  "
                >

                  <User size={18} />

                  My Profile

                </button>

                {/* Settings */}

                <button
                  onClick={() => {
                    setShowProfileMenu(false);

                    navigate("/settings");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[var(--secondary-text)]
                    hover:bg-[var(--card-hover)]
                    hover:text-[var(--primary-text)]
                    transition
                  "
                >

                  <Settings size={18} />

                  Settings

                </button>

              </div>

              {/* Logout */}

              <div
                className="
                  border-t
                  border-[var(--border-color)]
                  p-2
                "
              >

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[var(--secondary-text)]
                    hover:bg-[var(--active-bg)]
                    hover:text-[var(--active-text)]
                    transition
                  "
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;