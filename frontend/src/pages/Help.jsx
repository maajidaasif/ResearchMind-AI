import MainLayout from "../layouts/MainLayout";
import {
  CircleHelp,
  Mail,
  MessageCircle,
  BookOpen,
} from "lucide-react";

function Help() {

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold text-white">

        Help & Support

      </h1>

      <p className="text-slate-400 mt-3">

        Need assistance? Find answers to common questions below.

      </p>

      {/* FAQ */}

      <div className="mt-10 bg-[#111C44] rounded-3xl border border-slate-700 p-8">

        <div className="flex items-center gap-3 mb-6">

          <CircleHelp
            className="text-indigo-400"
            size={28}
          />

          <h2 className="text-2xl text-white font-semibold">

            Frequently Asked Questions

          </h2>

        </div>

        <div className="space-y-6">

          <div>

            <h3 className="text-white font-semibold">

              How do I upload research papers?

            </h3>

            <p className="text-slate-400 mt-2">

              Go to Upload Papers and select your PDF files.

            </p>

          </div>

          <div>

            <h3 className="text-white font-semibold">

              What file formats are supported?

            </h3>

            <p className="text-slate-400 mt-2">

              Currently only PDF (.pdf) research papers.

            </p>

          </div>

          <div>

            <h3 className="text-white font-semibold">

              Is my research data secure?

            </h3>

            <p className="text-slate-400 mt-2">

              Yes. Your papers remain stored locally during development.

            </p>

          </div>

        </div>

      </div>

      {/* Contact */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-6">

          <Mail
            className="text-indigo-400"
            size={28}
          />

          <h3 className="text-white text-xl font-semibold mt-4">

            Email

          </h3>

          <p className="text-slate-400 mt-2">

            support@researchmind.ai

          </p>

        </div>

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-6">

          <MessageCircle
            className="text-indigo-400"
            size={28}
          />

          <h3 className="text-white text-xl font-semibold mt-4">

            Live Chat

          </h3>

          <p className="text-slate-400 mt-2">

            Available in Module 3.

          </p>

        </div>

        <div className="bg-[#111C44] rounded-3xl border border-slate-700 p-6">

          <BookOpen
            className="text-indigo-400"
            size={28}
          />

          <h3 className="text-white text-xl font-semibold mt-4">

            Documentation

          </h3>

          <p className="text-slate-400 mt-2">

            User guide coming soon.

          </p>

        </div>

      </div>

    </MainLayout>

  );

}

export default Help;