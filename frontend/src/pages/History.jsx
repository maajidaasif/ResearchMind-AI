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

          <h1 className="text-4xl font-bold text-[var(--primary-text)]">

            Analysis History

          </h1>

          <p className="text-[var(--secondary-text)] mt-2">

            View all your previous AI research analyses.

          </p>

        </div>

        <button
          onClick={() =>
            navigate("/upload")
          }
          className="
            bg-[var(--button-bg)]
            text-[var(--button-text)]
            border
            border-[var(--border-color)]
            px-6
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            gap-2
            transition
            hover:opacity-80
          "
        >

          <Upload size={18} />

          New Analysis

        </button>

      </div>

      {/* Search */}

      <div className="relative mt-10">

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
          placeholder="Search previous analyses..."
          className="
            w-full
            bg-[var(--input-bg)]
            border
            border-[var(--border-color)]
            rounded-2xl
            py-4
            pl-12
            pr-5
            text-[var(--primary-text)]
            placeholder:text-[var(--muted-text)]
            outline-none
            focus:border-[var(--secondary-text)]
            transition
          "
        />

      </div>

      {/* Empty State */}

      <div
        className="
          mt-10
          bg-[var(--card-bg)]
          rounded-3xl
          border
          border-[var(--border-color)]
          p-16
          transition-colors
          duration-300
        "
      >

        <div className="flex flex-col items-center">

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-[var(--button-bg)]
              flex
              items-center
              justify-center
            "
          >

            <History
              size={48}
              className="text-[var(--button-text)]"
            />

          </div>

          <h2 className="text-3xl font-bold text-[var(--primary-text)] mt-8">

            No Analysis History

          </h2>

          <p className="text-[var(--secondary-text)] mt-4 max-w-xl text-center leading-7">

            Complete your first AI analysis
            after uploading a research paper.
            Your previous analyses will appear
            here automatically.

          </p>

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              mt-8
              bg-[var(--button-bg)]
              text-[var(--button-text)]
              border
              border-[var(--border-color)]
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
              hover:opacity-80
            "
          >

            Start First Analysis

          </button>

        </div>

      </div>

      {/* Information */}

      <div
        className="
          mt-10
          bg-[var(--card-bg)]
          rounded-3xl
          border
          border-[var(--border-color)]
          p-8
          transition-colors
          duration-300
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-[var(--card-hover)]
              flex
              items-center
              justify-center
              shrink-0
            "
          >

            <Clock3
              size={26}
              className="text-[var(--primary-text)]"
            />

          </div>

          <div>

            <h2 className="text-[var(--primary-text)] text-xl font-semibold">

              Available in Upcoming Module

            </h2>

            <div className="mt-4 space-y-2 text-[var(--secondary-text)]">

              <p>
                • View completed AI analyses
              </p>

              <p>
                • Generate literature surveys
              </p>

              <p>
                • Detect research gaps
              </p>

              <p>
                • Download AI reports
              </p>

              <p>
                • Delete analysis history
              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default AnalysisHistory;