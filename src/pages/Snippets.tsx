import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const snippets = [
  {
    title: "Custom React Hook for Local Storage",
    description: "A reusable hook to persist state in localStorage with TypeScript support.",
    language: "TypeScript",
    category: "React",
  },
  {
    title: "Debounce Function",
    description: "Optimize performance by limiting function execution rate.",
    language: "JavaScript",
    category: "Utility",
  },
  {
    title: "Responsive Navigation Component",
    description: "A fully responsive navigation bar with mobile menu support.",
    language: "React",
    category: "Component",
  },
  {
    title: "API Rate Limiter",
    description: "Middleware to prevent API abuse with configurable limits.",
    language: "Node.js",
    category: "Backend",
  },
];

const Snippets = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-4">Code Snippets</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Useful code snippets and utilities I use frequently.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {snippets.map((snippet, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold">{snippet.title}</h2>
                  <div className="flex gap-2 shrink-0">
                    <Badge variant="secondary">{snippet.language}</Badge>
                    <Badge variant="outline">{snippet.category}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{snippet.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Snippets;