import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Grid, ExternalLink, Code, Play } from "lucide-react";

const templates = [
  {
    id: "ecommerce",
    title: "E-commerce Starter",
    tagline: "Product catalog, cart, checkout & admin UI",
    description:
      "Product grid, filters, product detail, cart, checkout flow and a lightweight admin dashboard for managing products and orders.",
    features: [
      "Product grid + filters",
      "Cart & checkout components",
      "Admin product CRUD pages",
      "Payment / order status UI",
    ],
    preview: "#preview-ecommerce",
    docs: "/starters/ecommerce/components",
    repo: "https://github.com/your-org/ecommerce-starter",
  },
  {
    id: "portfolio",
    title: "Portfolio Starter",
    tagline: "Showcase projects — fast and beautiful",
    description:
      "Hero, project gallery, case-study layout, blog list and contact form — perfect for developers & designers.",
    features: ["Hero + CTA", "Project gallery", "Lightbox & case studies", "Blog listing"],
    preview: "#preview-portfolio",
    docs: "/starters/portfolio/components",
    repo: "https://github.com/your-org/portfolio-starter",
  },
  {
    id: "lms",
    title: "LMS / Course Platform",
    tagline: "Courses, progress, quizzes & admin",
    description:
      "Course catalog, learning player, progress tracking, quizzes and an instructor admin area to upload content and manage students.",
    features: [
      "Course catalog",
      "Video player + progress",
      "Quizzes & scoring",
      "Instructor dashboard",
    ],
    preview: "#preview-lms",
    docs: "/starters/lms/components",
    repo: "https://github.com/your-org/lms-starter",
  },
  {
    id: "social",
    title: "Social Media Starter",
    tagline: "Feed, profiles, posts & realtime reactions",
    description:
      "Social feed, profile pages, post composer, likes/comments, and a simple realtime layer for reactions and notifications.",
    features: ["Feed & composer", "Profiles", "Notifications", "Realtime reactions"],
    preview: "#preview-social",
    docs: "/starters/social/components",
    repo: "https://github.com/your-org/social-starter",
  },
  {
    id: "medical",
    title: "Medical / Health App",
    tagline: "Appointments, prescriptions & patient records",
    description:
      "Doctor search, appointment booking, teleconsult UI, patient records and prescriptions — HIPAA-aware UI patterns (implement protections on backend).",
    features: ["Doctor directory", "Booking flow", "Patient records UI", "Teleconsult screens"],
    preview: "#preview-medical",
    docs: "/starters/medical/components",
    repo: "https://github.com/your-org/medical-starter",
  },
  {
    id: "gaana",
    title: "Music / Gaana-style App",
    tagline: "Playlists, player, library & now playing",
    description:
      "Music library, playlist management, persistent audio player, and discovery screens — built for mobile and desktop web.",
    features: ["Persistent player", "Playlists & library", "Discovery modules", "Now playing UI"],
    preview: "#preview-gaana",
    docs: "/starters/gaana/components",
    repo: "https://github.com/your-org/gaana-starter",
  },
];

const TemplateCard = ({ t }: { t: (typeof templates)[0] }) => (
  <div className="rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{t.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t.tagline}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t.description}</p>

        <ul className="flex flex-wrap gap-2 mb-4">
          {t.features.map((f) => (
            <li
              key={f}
              className="text-xs px-2 py-1 rounded-md border text-gray-500 dark:text-gray-400 dark:border-gray-700"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {t.preview && (
            <a
              href={t.preview}
              className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              <Play size={14} /> Preview
            </a>
          )}
          {t.docs && (
            <Link
              to={t.docs}
              className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              <Code size={14} /> Components
            </Link>
          )}
          {t.repo && (
            <a
              href={t.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              <ExternalLink size={14} /> Repo
            </a>
          )}
        </div>
      </div>

      <div className="shrink-0 ml-4 hidden md:block">
        <div className="w-36 h-24 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border dark:border-gray-700 flex items-center justify-center">
          <Grid size={36} className="text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  </div>
);

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-6 dark:text-gray-100">Starter Templates</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Ready-to-use UI starter packs for different app types.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
