import { useNavigate } from "react-router-dom";
import {
  History,
  Search,
  Upload,
  Clock3,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

function AnalysisHistory() {

  const navigate = useNavigate();

  return (

    <MainLayout>

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">

            Analysis History

          </h1>

          <p className="text-slate-400 mt-2">

            View all your previous AI research analyses.

          </p>

        </div>

        <button
          onClick={() => navigate("/upload")}
          className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
        >

          <Upload size={18} />

          New Analysis

        </button>

      </div>

      {/* Search */}

      <div className="relative mt-10">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search previous analyses..."
          className="w-full bg-[#111C44] border border-slate-700 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-indigo-500 transition"
        />

      </div>

      {/* Empty State */}

      <div className="mt-10 bg-[#111C44] rounded-3xl border border-slate-700 p-16">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center">

            <History
              size={48}
              className="text-white"
            />

          </div>

          <h2 className="text-3xl font-bold text-white mt-8">

            No Analysis History

          </h2>

          <p className="text-slate-400 mt-4 max-w-xl text-center">

           Complete your first AI analysis after uploading a research paper. Your previous analyses will appear here automatically.

          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-xl text-white font-semibold"
          >

            Start First Analysis

          </button>

        </div>

      </div>

      {/* Information */}

      <div className="mt-10 bg-[#111C44] rounded-3xl border border-slate-700 p-8">

        <div className="flex items-center gap-4">

          <Clock3
            size={28}
            className="text-indigo-400"
          />

          <div>

            <h2 className="text-white text-xl font-semibold">

          Available in Upcoming Module
            </h2>

            <p className="text-slate-400 mt-2">

              • View completed AI analyses

            </p>

            <p className="text-slate-400">

              • Generate literature surveys

            </p>

            <p className="text-slate-400">

              • Detect research gaps

            </p>
            <p className="text-slate-400">

           • Download AI reports

            </p>


            <p className="text-slate-400">

              • Delete analysis history

            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default AnalysisHistory;