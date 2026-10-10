import { useEffect, useState } from "react";
import {
  FileText,
  Trash2,
  Eye,
  GitCompare,
  RefreshCw,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

function MyPapers() {

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  // ---------------------------------------
  // Get uploaded papers
  // ---------------------------------------
  const fetchPapers = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/papers"
      );

      const data = await response.json();

      if (response.ok) {

        setPapers(data);

      } else {

        alert(
          data.message ||
          "Unable to load research papers."
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to backend. Please make sure Flask is running."
      );

    } finally {

      setLoading(false);

    }

  };


  // ---------------------------------------
  // Load papers when page opens
  // ---------------------------------------
  useEffect(() => {

    fetchPapers();

  }, []);


  // ---------------------------------------
  // Delete paper
  // ---------------------------------------
  const deletePaper = async (paperId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this research paper?"
    );

    if (!confirmDelete) {
      return;
    }

    setDeleting(paperId);

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/paper/${paperId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Research paper deleted successfully.");

        // Refresh paper list
        fetchPapers();

      } else {

        alert(
          data.message ||
          "Unable to delete paper."
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to backend."
      );

    } finally {

      setDeleting(null);

    }

  };


  // ---------------------------------------
  // Open uploaded PDF
  // ---------------------------------------
  const viewPaper = (filename) => {

    window.open(
      `http://127.0.0.1:5000/uploads/${encodeURIComponent(filename)}`,
      "_blank"
    );

  };


  // ---------------------------------------
  // Go to Paper Comparison
  // ---------------------------------------
  const comparePapers = () => {

    window.location.href = "/paper-comparison";

  };


  return (

    <MainLayout>

      {/* ---------------------------------
          HEADER
      ---------------------------------- */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-5">

          <div
            className="
              rounded-2xl
              bg-[var(--button-bg)]
              p-4
            "
          >

            <FileText
              size={38}
              className="text-[var(--button-text)]"
            />

          </div>

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-[var(--primary-text)]
              "
            >
              My Research Papers
            </h1>

            <p
              className="
                mt-2
                text-[var(--secondary-text)]
              "
            >
              View and manage your uploaded research papers.
            </p>

          </div>

        </div>


        {/* Refresh */}

        <button
          onClick={fetchPapers}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[var(--border-color)]
            px-5
            py-3
            font-medium
            transition
            hover:bg-[var(--card-hover)]
            disabled:opacity-50
          "
        >

          <RefreshCw size={18} />

          Refresh

        </button>

      </div>


      {/* ---------------------------------
          PAPER COUNT
      ---------------------------------- */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p
              className="
                text-sm
                text-[var(--secondary-text)]
              "
            >
              Uploaded Research Papers
            </p>

            <p
              className="
                mt-1
                text-3xl
                font-bold
                text-[var(--primary-text)]
              "
            >
              {papers.length}
            </p>

          </div>


          {/* Compare button */}

          {papers.length >= 2 && (

            <button
              onClick={comparePapers}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[var(--button-bg)]
                px-6
                py-3
                font-semibold
                text-[var(--button-text)]
                transition
                hover:opacity-90
              "
            >

              <GitCompare size={19} />

              Compare Papers

            </button>

          )}

        </div>

      </div>


      {/* ---------------------------------
          LOADING
      ---------------------------------- */}

      {loading && (

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-10
            text-center
          "
        >

          <p
            className="
              text-lg
              font-medium
              text-[var(--primary-text)]
            "
          >
            Loading research papers...
          </p>

        </div>

      )}


      {/* ---------------------------------
          NO PAPERS
      ---------------------------------- */}

      {!loading && papers.length === 0 && (

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-10
            text-center
          "
        >

          <FileText
            size={48}
            className="
              mx-auto
              text-[var(--secondary-text)]
            "
          />

          <h2
            className="
              mt-5
              text-xl
              font-bold
              text-[var(--primary-text)]
            "
          >
            No Research Papers
          </h2>

          <p
            className="
              mt-2
              text-[var(--secondary-text)]
            "
          >
            Upload research papers to start analyzing them.
          </p>

        </div>

      )}


      {/* ---------------------------------
          PAPER LIST
      ---------------------------------- */}

      {!loading && papers.length > 0 && (

        <div className="mt-8 space-y-5">

          {papers.map((paper) => (

            <div
              key={paper.id}
              className="
                rounded-2xl
                border
                border-[var(--border-color)]
                bg-[var(--card-bg)]
                p-6
                transition
                hover:shadow-lg
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                {/* Paper information */}

                <div className="flex items-start gap-4">

                  <div
                    className="
                      rounded-xl
                      bg-[var(--button-bg)]
                      p-3
                    "
                  >

                    <FileText
                      size={25}
                      className="text-[var(--button-text)]"
                    />

                  </div>


                  <div>

                    <h2
                      className="
                        text-lg
                        font-bold
                        text-[var(--primary-text)]
                      "
                    >
                      {paper.filename}
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-[var(--secondary-text)]
                      "
                    >
                      Uploaded:{" "}
                      {paper.uploaded_at
                        ? new Date(
                            paper.uploaded_at
                          ).toLocaleString()
                        : "Unknown"}
                    </p>

                  </div>

                </div>


                {/* Actions */}

                <div className="flex flex-wrap gap-3">

                  {/* View */}

                  <button
                    onClick={() =>
                      viewPaper(paper.filename)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-[var(--border-color)]
                      px-4
                      py-2
                      font-medium
                      transition
                      hover:bg-[var(--card-hover)]
                    "
                  >

                    <Eye size={18} />

                    View

                  </button>


                  {/* Delete */}

                  <button
                    onClick={() =>
                      deletePaper(paper.id)
                    }
                    disabled={
                      deleting === paper.id
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-red-500
                      px-4
                      py-2
                      font-medium
                      text-red-500
                      transition
                      hover:bg-red-500
                      hover:text-white
                      disabled:opacity-50
                    "
                  >

                    <Trash2 size={18} />

                    {deleting === paper.id
                      ? "Deleting..."
                      : "Delete"}

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* ---------------------------------
          COMPARISON INFORMATION
      ---------------------------------- */}

      {!loading && papers.length === 1 && (

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-6
          "
        >

          <p
            className="
              text-[var(--secondary-text)]
            "
          >
            Upload at least{" "}
            <strong>2 research papers</strong>{" "}
            to use the Paper Comparison Engine.
          </p>

        </div>

      )}

    </MainLayout>

  );

}

export default MyPapers;