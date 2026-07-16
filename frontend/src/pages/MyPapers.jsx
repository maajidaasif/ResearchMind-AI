import {
  useEffect,
  useState,
} from "react";

import {
  FolderOpen,
  Upload,
  Trash2,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function MyPapers() {
  const navigate = useNavigate();

  const [papers, setPapers] =
    useState([]);

  // Load Papers
  const loadPapers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/papers"
      );

      const data =
        await response.json();

      setPapers(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.log(
        "Load Papers Error:",
        error
      );

      setPapers([]);
    }
  };

  // Delete Paper
  const deletePaper = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this paper?"
      );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/paper/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      alert(
        data.message ||
          "Paper deleted."
      );

      loadPapers();
    } catch (error) {
      console.log(
        "Delete Paper Error:",
        error
      );

      alert(
        "Unable to delete paper."
      );
    }
  };

  useEffect(() => {
    loadPapers();
  }, []);

  return (
    <MainLayout>

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-[var(--primary-text)]">

            My Papers

          </h1>

          <p className="text-[var(--secondary-text)] mt-3">

            View and manage your uploaded research papers.

          </p>

        </div>

        {papers.length > 0 && (

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--button-bg)]
              text-[var(--button-text)]
              border
              border-[var(--border-color)]
              px-6
              py-3
              font-semibold
              transition
              hover:opacity-80
            "
          >

            <Upload size={19} />

            Upload Paper

          </button>

        )}

      </div>

      {papers.length === 0 ? (

        /* Empty State */

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-14
            text-center
            transition-colors
            duration-300
          "
        >

          <div className="flex justify-center">

            <div
              className="
                w-24
                h-24
                rounded-full
                bg-[var(--card-hover)]
                flex
                items-center
                justify-center
              "
            >

              <FolderOpen
                size={50}
                className="text-[var(--primary-text)]"
              />

            </div>

          </div>

          <h2 className="text-3xl font-bold text-[var(--primary-text)] mt-6">

            No Research Papers Found

          </h2>

          <p className="text-[var(--secondary-text)] mt-4">

            Upload your first research paper.

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
              flex
              items-center
              gap-3
              mx-auto
              transition
              hover:opacity-80
            "
          >

            <Upload size={20} />

            Upload First Paper

          </button>

        </div>

      ) : (

        /* Paper List */

        <div className="space-y-5">

          {papers.map((paper) => (

            <div
              key={paper.id}
              className="
                bg-[var(--card-bg)]
                border
                border-[var(--border-color)]
                rounded-2xl
                p-6
                flex
                justify-between
                items-center
                transition
                hover:bg-[var(--card-hover)]
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-[var(--card-hover)]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <FileText
                    size={21}
                    className="text-[var(--primary-text)]"
                  />

                </div>

                <div>

                  <a
                    href={`http://127.0.0.1:5000/uploads/${encodeURIComponent(
                      paper.filename
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-[var(--primary-text)]
                      text-xl
                      font-semibold
                      hover:opacity-70
                      transition
                    "
                  >

                    {paper.filename}

                  </a>

                  <p className="text-[var(--secondary-text)] mt-2">

                    Uploaded:{" "}
                    {paper.uploaded_at}

                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  deletePaper(paper.id)
                }
                className="
                  border
                  border-red-500
                  px-5
                  py-2
                  rounded-xl
                  text-red-500
                  flex
                  items-center
                  gap-2
                  transition
                  hover:bg-red-600
                  hover:text-white
                "
              >

                <Trash2 size={18} />

                Delete

              </button>

            </div>

          ))}

        </div>

      )}

    </MainLayout>
  );
}

export default MyPapers;