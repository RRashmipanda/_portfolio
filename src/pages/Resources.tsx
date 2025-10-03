
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    title: "React Documentation",
    description: "The official React documentation with comprehensive guides and API reference.",
    url: "https://react.dev",
    category: "Documentation",
  },
  {
    title: "TypeScript Handbook",
    description: "Learn TypeScript from the ground up with the official handbook.",
    url: "https://www.typescriptlang.org/docs/",
    category: "Documentation",
  },
  {
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building custom designs.",
    url: "https://tailwindcss.com",
    category: "CSS",
  },
  {
    title: "MDN Web Docs",
    description: "Comprehensive web development documentation and learning resources.",
    url: "https://developer.mozilla.org",
    category: "Reference",
  },
  {
    title: "Next.js Docs",
    description: "The React framework for production - documentation and guides.",
    url: "https://nextjs.org/docs",
    category: "Framework",
  },
  {
    title: "Web.dev",
    description: "Guidance from Google on modern web development best practices.",
    url: "https://web.dev",
    category: "Learning",
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-4">Resources</h1>
        <p className="text-xl text-muted-foreground mb-12">
          A curated list of resources I find helpful for web development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-6 h-full hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl font-semibold">{resource.title}</h2>
                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {resource.description}
                  </p>
                  <span className="text-xs text-accent font-medium">
                    {resource.category}
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Resources;