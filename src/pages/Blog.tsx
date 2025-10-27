import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Copy,
  Check,
  Layout,
  User,
  LogIn,
  LogOut,
  Loader,
  Home,
  Menu,
} from "lucide-react";

const components = [
  {
    id: "navbar",
    title: "Navbar",
    description: "Responsive navigation bar with logo, links and menu toggle.",
    preview: (
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="font-bold text-gray-800 dark:text-gray-100">Brand</div>
        <div className="hidden md:flex gap-4 text-gray-600 dark:text-gray-300">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Contact</a>
        </div>
        <button className="md:hidden">
          <Menu size={20} />
        </button>
      </div>
    ),
    code: `
<nav className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-md">
  <div className="font-bold text-gray-800 dark:text-gray-100">Brand</div>
  <div className="hidden md:flex gap-4 text-gray-600 dark:text-gray-300">
    <a href="#">Home</a>
    <a href="#">Features</a>
    <a href="#">Contact</a>
  </div>
  <button className="md:hidden">
    <Menu size={20} />
  </button>
</nav>
    `.trim(),
    icon: <Layout size={32} className="text-gray-500 dark:text-gray-400" />,
  },
  {
    id: "hero",
    title: "Hero Section",
    description: "A clean hero section with heading, subtext and CTA button.",
    preview: (
      <div className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-md">
        <h2 className="text-2xl font-bold mb-2 dark:text-white">
          Build beautiful UIs faster
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Use ready-made Tailwind components and speed up development.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </div>
    ),
    code: `
<section className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-md">
  <h2 className="text-2xl font-bold mb-2 dark:text-white">Build beautiful UIs faster</h2>
  <p className="text-gray-600 dark:text-gray-400 mb-4">Use ready-made Tailwind components and speed up development.</p>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Get Started</button>
</section>
    `.trim(),
    icon: <Home size={32} className="text-gray-500 dark:text-gray-400" />,
  },
  {
    id: "signin",
    title: "Sign In Form",
    description: "Simple login form with email and password fields.",
    preview: (
      <form className="p-6 bg-gray-50 dark:bg-gray-900 rounded-md space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700"
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded-md">
          Sign In
        </button>
      </form>
    ),
    code: `
<form className="p-6 bg-gray-50 dark:bg-gray-900 rounded-md space-y-3">
  <input type="email" placeholder="Email" className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700" />
  <input type="password" placeholder="Password" className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700" />
  <button className="w-full py-2 bg-blue-600 text-white rounded-md">Sign In</button>
</form>
    `.trim(),
    icon: <LogIn size={32} className="text-gray-500 dark:text-gray-400" />,
  },
  {
    id: "loader",
    title: "Loader",
    description: "Simple animated loader with Tailwind CSS.",
    preview: (
      <div className="flex justify-center items-center py-10">
        <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    code: `
<div className="flex justify-center items-center py-10">
  <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
</div>
    `.trim(),
    icon: <Loader size={32} className="text-gray-500 dark:text-gray-400" />,
  },
];

const ComponentCard = ({ c }: { c: (typeof components)[0] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(c.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {c.icon}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {c.title}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-sm border px-3 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {c.description}
      </p>

      <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 mb-4">
        {c.preview}
      </div>

      <pre className="text-xs bg-gray-100 dark:bg-gray-950 p-3 rounded-md overflow-x-auto text-gray-800 dark:text-gray-200">
        <code>{c.code}</code>
      </pre>
    </div>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-6 dark:text-gray-100">UI Vault</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Ready-to-copy Tailwind UI components for faster prototyping.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((c) => (
            <ComponentCard key={c.id} c={c} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
