import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  Upload,
  Loader2,
  CheckCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

function UploadPage() {

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

const [openPicker, setOpenPicker] = useState(false);

useEffect(() => {

  if (openPicker && fileInputRef.current) {

    fileInputRef.current.click();

    setOpenPicker(false);

  }

}, [openPicker]);

// 👇 Then your existing function continues
const openFilePicker = () => {

  fileInputRef.current.click();

};


  const uploadMore = () => {

    setUploadSuccess(false);

    setUploadedFiles([]);

    setMessage("");

    setError("");

    setOpenPicker(true);

};
    const handleFileChange = async (event) => {

    const files = event.target.files;

    if (!files || files.length === 0) {

      return;

    }

    setUploading(true);

    setUploadSuccess(false);

    setError("");

    setMessage("");

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {

      formData.append("papers", files[i]);

    }

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/upload-paper",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {

        setUploadSuccess(true);

        setUploadedFiles(data.papers);

        setMessage(data.message);

      } else {

        setError(data.message);

      }

    } catch (err) {

      setError("Upload failed. Please try again.");

    } finally {

      setUploading(false);

    }

  };



  return (

    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white">

          Upload Research Papers

        </h1>

        <p className="text-slate-400 mt-3">

          Upload one or more research papers to begin AI-powered analysis.

        </p>
                {!uploadSuccess ? (

          <>

            <div className="mt-10 bg-[#111C44] rounded-3xl border border-slate-700 p-8 md:p-14 shadow-xl">

              <div className="flex flex-col items-center text-center">

                <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center">

                  {uploading ? (

                    <Loader2
                      size={48}
                      className="text-white animate-spin"
                    />

                  ) : (

                    <UploadCloud
                      size={48}
                      className="text-white"
                    />

                  )}

                </div>

                <h2 className="text-3xl font-bold text-white mt-8">

                  {uploading
                    ? "Uploading Research Papers..."
                    : "Drag & Drop your PDF here"}

                </h2>

                <p className="text-slate-400 mt-4">

                  Supported format: PDF (.pdf)

                </p>

                <button
                  onClick={openFilePicker}
                  disabled={uploading}
                  className="mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
                >

                  <Upload size={20} />

                  {uploading ? "Uploading..." : "Browse Files"}

                </button>

                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

              </div>

            </div>

            <div className="mt-10 bg-[#111C44] rounded-3xl border border-slate-700 p-8">

              <div className="flex items-center gap-4">

                <FileText
                  size={30}
                  className="text-indigo-400"
                />

                <div>

                  <h2 className="text-white text-xl font-semibold">

                    Supported Files

                  </h2>

                  <p className="text-slate-400 mt-2">

                    • Research Papers (.pdf)

                  </p>

                  <p className="text-slate-400">

                    • Multiple PDF Upload Supported

                  </p>

                  <p className="text-slate-400">

                    • AI Ready Processing

                  </p>

                </div>

              </div>

            </div>

          </>

        ) : (

          <>            <div className="mt-10 bg-[#111C44] border border-green-500 rounded-3xl p-10 shadow-xl">

              <div className="flex flex-col items-center text-center">

                <CheckCircle
                  size={80}
                  className="text-green-400"
                />

                <h2 className="text-3xl font-bold text-white mt-6">

                  Research Papers Uploaded Successfully!

                </h2>

                <p className="text-green-300 mt-3">

                  {message}

                </p>

                <div className="mt-8 w-full bg-[#1A295A] rounded-2xl p-6">

                  <h3 className="text-white text-xl font-semibold mb-5">

                    Uploaded Papers

                  </h3>

                  {uploadedFiles.map((paper, index) => (

                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#22366E] rounded-xl px-4 py-3 mb-3"
                    >

                      <div className="flex items-center gap-3">

                        <FileText
                          size={22}
                          className="text-indigo-300"
                        />

                        <span className="text-white">

                          {paper.filename}

                        </span>

                      </div>

                      <CheckCircle
                        size={22}
                        className="text-green-400"
                      />

                    </div>

                  ))}

                </div>

                <div className="mt-8 w-full bg-green-900/20 border border-green-500 rounded-2xl p-6">

                  <h3 className="text-green-300 text-xl font-semibold">

                    Ready for AI Analysis ✅

                  </h3>

                  <p className="text-slate-300 mt-3">

                    Your research papers have been uploaded successfully and are ready for the next AI processing modules.

                  </p>

                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                  <button
                    onClick={uploadMore}
                    className="bg-indigo-600 hover:bg-indigo-700 transition-all py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2"
                  >

                    <Upload size={20} />

                    Upload More Papers

                  </button>

                  <button
                    onClick={() => navigate("/papers")}
                    className="bg-green-600 hover:bg-green-700 transition-all py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2"
                  >

                    View My Papers

                    <ArrowRight size={20} />

                  </button>

                </div>

              </div>

            </div>

          </>

        )}

        {error && (

          <div className="mt-6 bg-red-500/20 border border-red-500 rounded-xl p-4 text-center text-red-300">

            {error}

          </div>

        )}

      </div>

    </MainLayout>

  );

}

export default UploadPage;