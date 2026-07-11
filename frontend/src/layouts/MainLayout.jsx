import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";

function MainLayout({ children }) {
  return (
    <div className="flex bg-[#060B23] min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;