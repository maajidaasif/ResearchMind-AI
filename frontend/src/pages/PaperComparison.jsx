import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import {
  GitCompare,
  Copy,
  Download,
  Sparkles,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";


/* =========================================================
   PARSE PAPER COMPARISON RESULT
   ========================================================= */

const parseComparisonResult = (result) => {

  if (!result) {
    return {
      papers: [],
      rows: [],
    };
  }

  const lines = result
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const papers = [];
  const sections = [];

  let currentSection = null;
  let currentPaper = null;

  for (const line of lines) {

    // Ignore markdown headings
    const cleanLine = line
      .replace(/^#+\s*/, "")
      .trim();

    // Detect paper name
    if (/^.+\.pdf:$/i.test(cleanLine)) {

      const paperName = cleanLine.replace(/:$/, "").trim();

      if (!papers.includes(paperName)) {
        papers.push(paperName);
      }

      currentPaper = paperName;

      if (!currentSection) {
        currentSection = {
          name: "Comparison",
          data: {},
        };

        sections.push(currentSection);
      }

      if (!currentSection.data[currentPaper]) {
        currentSection.data[currentPaper] = "";
      }

      continue;
    }

    // If we don't have a paper yet,
    // this is most likely a section heading.
    if (!currentPaper) {

      if (!currentSection) {

        currentSection = {
          name: cleanLine,
          data: {},
        };

        sections.push(currentSection);

      }

      continue;
    }

    /*
      Detect a new section.

      Typical sections:
      Methodology Comparison
      Accuracy Comparison
      Dataset Comparison
      Advantages
      Limitations
      Future Work
    */

    const knownSections = [
      "Methodology Comparison",
      "Accuracy Comparison",
      "Dataset Comparison",
      "Advantages",
      "Limitations",
      "Future Work",
      "Methodology",
      "Accuracy",
      "Datasets",
      "Advantages and Limitations",
      "Future Research Directions",
    ];

    const isKnownSection = knownSections.some(
      (section) =>
        cleanLine.toLowerCase() === section.toLowerCase()
    );

    if (
      isKnownSection &&
      !cleanLine.includes(":")
    ) {

      currentSection = {
        name: cleanLine,
        data: {},
      };

      sections.push(currentSection);

      currentPaper = null;

      continue;
    }

    // Add content to current paper
    if (!currentSection.data[currentPaper]) {
      currentSection.data[currentPaper] = cleanLine;
    } else {
      currentSection.data[currentPaper] +=
        " " + cleanLine;
    }
  }


  /*
    Remove the generic "Comparison" section
    if proper sections exist.
  */

  const validSections = sections.filter(
    (section) =>
      section.name &&
      section.name.toLowerCase() !== "comparison"
  );


  /*
    If parser did not detect sections properly,
    create one generic row.
  */

  if (validSections.length === 0) {

    return {
      papers,
      rows: [
        {
          criterion: "Comparison",
          values: papers.map(() => ""),
        },
      ],
    };

  }


  const rows = validSections.map((section) => {

    return {
      criterion: section.name,
      values: papers.map(
        (paper) =>
          section.data[paper] || "Not Available"
      ),
    };

  });


  return {
    papers,
    rows,
  };
};


/* =========================================================
   COMPONENT
   ========================================================= */

function PaperComparison() {

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [domain, setDomain] = useState("");


  /* =======================================================
     GENERATE COMPARISON
     ======================================================= */

  const generateComparison = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/compare-papers"
      );

      const data = await response.json();

      if (data.success) {

        setReport(data.comparison || "");

        setDomain(
          data.domain || "Not Available"
        );

      } else {

        alert(
          data.message ||
          "Unable to generate paper comparison."
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to backend."
      );

    }

    setLoading(false);
  };


  /* =======================================================
     COPY
     ======================================================= */

  const copyReport = () => {

    if (!report) {

      alert(
        "Please generate a comparison first."
      );

      return;
    }

    navigator.clipboard.writeText(report);

    alert(
      "Paper Comparison copied successfully."
    );
  };


  /* =======================================================
     DOWNLOAD PDF
     ======================================================= */

  const downloadReport = () => {

    if (!report) {

      alert(
        "Please generate a comparison first."
      );

      return;
    }

    const parsed = parseComparisonResult(report);

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });


    /* -----------------------------------------------------
       HEADER
       ----------------------------------------------------- */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    doc.text(
      "ResearchMind AI",
      20,
      18
    );

    doc.setFontSize(15);

    doc.text(
      "Paper Comparison Report",
      20,
      28
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `Research Domain: ${domain || "Not Available"}`,
      20,
      36
    );

    doc.text(
      `Generated On: ${new Date().toLocaleString()}`,
      20,
      42
    );


    /* -----------------------------------------------------
       TABLE
       ----------------------------------------------------- */

    const head = [
      [
        "Criteria",
        ...parsed.papers,
      ],
    ];

    const body = parsed.rows.map(
      (row) => [
        row.criterion,
        ...row.values,
      ]
    );


    autoTable(doc, {

      startY: 50,

      head: head,

      body: body,

      theme: "grid",

      styles: {
        fontSize: 8,
        cellPadding: 4,
        valign: "top",
        overflow: "linebreak",
      },

      headStyles: {
        fontStyle: "bold",
        halign: "center",
      },

      columnStyles: {
        0: {
          cellWidth: 38,
          fontStyle: "bold",
        },
      },

      margin: {
        left: 15,
        right: 15,
      },

      didDrawPage: function () {

        const pageHeight =
          doc.internal.pageSize.height;

        doc.setFontSize(9);

        doc.setFont(
          "helvetica",
          "italic"
        );

        doc.text(
          "Generated by ResearchMind AI",
          15,
          pageHeight - 8
        );

      },

    });


    doc.save(
      "PaperComparisonReport.pdf"
    );

  };


  /* =======================================================
     PARSED TABLE
     ======================================================= */

  const parsed = parseComparisonResult(
    report
  );


  /* =======================================================
     UI
     ======================================================= */

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="flex items-center gap-5">

        <div
          className="
            rounded-2xl
            bg-[var(--button-bg)]
            p-4
          "
        >

          <GitCompare
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
            Paper Comparison Engine
          </h1>

          <p
            className="
              mt-2
              text-[var(--secondary-text)]
            "
          >
            Compare multiple research papers based
            on methodology, accuracy, datasets,
            advantages, limitations and future work.
          </p>

        </div>

      </div>


      {/* GENERATE BUTTON */}

      <div className="mt-10">

        <button
          onClick={generateComparison}
          disabled={loading}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-[var(--button-bg)]
            px-7
            py-3
            font-semibold
            text-[var(--button-text)]
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >

          <Sparkles size={18} />

          {loading
            ? "Generating Paper Comparison..."
            : "Generate Paper Comparison"}

        </button>

      </div>


      {/* LOADING */}

      {loading && (

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-8
          "
        >

          <p className="text-lg font-medium">

            AI is comparing your research papers...

          </p>

          <p
            className="
              mt-3
              text-[var(--secondary-text)]
            "
          >

            Analyzing methodologies, datasets,
            accuracy, advantages, limitations
            and future research opportunities.

          </p>

        </div>

      )}


      {/* REPORT */}

      {!loading && report && (

        <div
          className="
            mt-10
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-8
          "
        >

          {/* REPORT HEADER */}

          <div
            className="
              mb-8
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2 className="text-2xl font-bold">

                AI Paper Comparison

              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-[var(--secondary-text)]
                "
              >

                Research Domain:{" "}
                {domain || "Not Available"}

              </p>

            </div>


            {/* ACTIONS */}

            <div className="flex gap-3">

              <button
                onClick={copyReport}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--border-color)]
                  px-4
                  py-2
                  hover:bg-[var(--card-hover)]
                "
              >

                <Copy size={18} />

                Copy

              </button>


              <button
                onClick={downloadReport}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--border-color)]
                  px-4
                  py-2
                  hover:bg-[var(--card-hover)]
                "
              >

                <Download size={18} />

                Download PDF

              </button>

            </div>

          </div>


          {/* TABLE */}

          <div
            className="
              overflow-x-auto
              rounded-xl
              border
              border-[var(--border-color)]
            "
          >

            <table
              className="
                w-full
                border-collapse
                text-left
              "
            >

              <thead>

                <tr
                  className="
                    bg-[var(--button-bg)]
                    text-[var(--button-text)]
                  "
                >

                  <th
                    className="
                      border
                      border-[var(--border-color)]
                      px-4
                      py-4
                      font-bold
                    "
                  >
                    Criteria
                  </th>

                  {parsed.papers.map(
                    (paper, index) => (

                      <th
                        key={index}
                        className="
                          min-w-[220px]
                          border
                          border-[var(--border-color)]
                          px-4
                          py-4
                          font-bold
                        "
                      >

                        {paper}

                      </th>

                    )
                  )}

                </tr>

              </thead>


              <tbody>

                {parsed.rows.map(
                  (row, index) => (

                    <tr
                      key={index}
                      className="
                        align-top
                        hover:bg-[var(--card-hover)]
                      "
                    >

                      <td
                        className="
                          border
                          border-[var(--border-color)]
                          px-4
                          py-5
                          font-bold
                          whitespace-nowrap
                        "
                      >

                        {row.criterion}

                      </td>


                      {row.values.map(
                        (value, valueIndex) => (

                          <td
                            key={valueIndex}
                            className="
                              border
                              border-[var(--border-color)]
                              px-4
                              py-5
                              leading-7
                              whitespace-pre-wrap
                            "
                          >

                            {value}

                          </td>

                        )
                      )}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </MainLayout>

  );

}

export default PaperComparison;