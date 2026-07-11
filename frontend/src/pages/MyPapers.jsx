import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { FolderOpen, Upload, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyPapers() {

  const navigate = useNavigate();

  const [papers, setPapers] = useState([]);

  // Load papers from backend
  const loadPapers = async () => {

    try {

      const response = await fetch("http://127.0.0.1:5000/papers");

      const data = await response.json();

      setPapers(data);

    } catch (error) {

      console.log(error);

    }

  };

  // Delete paper
  const deletePaper = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paper?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/paper/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      alert(data.message);

      loadPapers();

    } catch (error) {

      alert("Unable to delete paper.");

    }

  };

  useEffect(() => {

    loadPapers();

  }, []);

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold text-white mb-8">

        My Papers

      </h1>

      {papers.length === 0 ? (

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-14 text-center">

          <div className="flex justify-center">

            <FolderOpen
              size={70}
              className="text-indigo-400"
            />

          </div>

          <h2 className="text-3xl font-bold text-white mt-6">

            No Research Papers Found

          </h2>

          <p className="text-slate-400 mt-4">

            Upload your first research paper.

          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-3 mx-auto"
          >

            <Upload size={20} />

            Upload First Paper

          </button>

        </div>

      ) : (

        <div className="space-y-5">

          {papers.map((paper) => (

            <div
              key={paper.id}
              className="bg-[#111C44] border border-slate-700 rounded-2xl p-6 flex justify-between items-center"
            >

              <div>

                <a
                  href={`http://127.0.0.1:5000/uploads/${encodeURIComponent(paper.filename)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xl font-semibold hover:text-indigo-400 transition"
                >

                  📄 {paper.filename}

                </a>

                <p className="text-slate-400 mt-2">

                  Uploaded:
                  {" "}
                  {paper.uploaded_at}

                </p>

              </div>

              <button
                onClick={() => deletePaper(paper.id)}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white flex items-center gap-2"
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