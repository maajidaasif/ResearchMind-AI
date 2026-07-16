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

      {/* Header */}

      <h1 className="text-4xl font-bold text-[var(--primary-text)]">

        Help & Support

      </h1>

      <p className="text-[var(--secondary-text)] mt-3">

        Need assistance? Find answers to common questions below.

      </p>

      {/* FAQ */}

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

        <div className="flex items-center gap-3 mb-6">

          <CircleHelp
            className="text-[var(--primary-text)]"
            size={28}
          />

          <h2 className="text-2xl text-[var(--primary-text)] font-semibold">

            Frequently Asked Questions

          </h2>

        </div>

        <div className="space-y-6">

          <div
            className="
              border-b
              border-[var(--border-color)]
              pb-6
            "
          >

            <h3 className="text-[var(--primary-text)] font-semibold">

              How do I upload research papers?

            </h3>

            <p className="text-[var(--secondary-text)] mt-2">

              Go to Upload Papers and select your PDF files.

            </p>

          </div>

          <div
            className="
              border-b
              border-[var(--border-color)]
              pb-6
            "
          >

            <h3 className="text-[var(--primary-text)] font-semibold">

              What file formats are supported?

            </h3>

            <p className="text-[var(--secondary-text)] mt-2">

              Currently only PDF (.pdf) research papers.

            </p>

          </div>

          <div>

            <h3 className="text-[var(--primary-text)] font-semibold">

              Is my research data secure?

            </h3>

            <p className="text-[var(--secondary-text)] mt-2">

              Yes. Your papers remain stored locally during development.

            </p>

          </div>

        </div>

      </div>

      {/* Contact */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {/* Email */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-[var(--card-hover)]
              flex
              items-center
              justify-center
            "
          >

            <Mail
              className="text-[var(--primary-text)]"
              size={25}
            />

          </div>

          <h3 className="text-[var(--primary-text)] text-xl font-semibold mt-4">

            Email

          </h3>

          <p className="text-[var(--secondary-text)] mt-2">

            support@researchmind.ai

          </p>

        </div>

        {/* Live Chat */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-[var(--card-hover)]
              flex
              items-center
              justify-center
            "
          >

            <MessageCircle
              className="text-[var(--primary-text)]"
              size={25}
            />

          </div>

          <h3 className="text-[var(--primary-text)] text-xl font-semibold mt-4">

            Live Chat

          </h3>

          <p className="text-[var(--secondary-text)] mt-2">

            Available in Module 3.

          </p>

        </div>

        {/* Documentation */}

        <div
          className="
            bg-[var(--card-bg)]
            rounded-3xl
            border
            border-[var(--border-color)]
            p-6
            transition
            hover:bg-[var(--card-hover)]
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-[var(--card-hover)]
              flex
              items-center
              justify-center
            "
          >

            <BookOpen
              className="text-[var(--primary-text)]"
              size={25}
            />

          </div>

          <h3 className="text-[var(--primary-text)] text-xl font-semibold mt-4">

            Documentation

          </h3>

          <p className="text-[var(--secondary-text)] mt-2">

            User guide coming soon.

          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default Help;