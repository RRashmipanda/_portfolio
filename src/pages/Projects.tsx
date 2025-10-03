import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    name: "Moonbeam",
    description:
      "Never write from scratch again. Kickstart your next great writing piece with Moonbeam. Your long-form writing AI assistant.",
    tags: ["Front-end", "GPT-3", "Next.js", "React", "TailwindCSS", "Chrome Extension"],
    url: "https://example.com",
    github: "https://github.com",
    icon: "📝",
  },
  {
    name: "Aceternity",
    description:
      "Building modern applications that scale well and are easy to maintain. Cutting edge websites with a pinch of magic, and a lot of love.",
    tags: ["Next.js", "React", "TailwindCSS", "Full-Stack"],
    url: "https://example.com",
    github: "https://github.com",
    icon: "✨",
  },
  {
    name: "Algochurn",
    description:
      "Practice the most popular algorithmic questions and Front-end interview questions with an interactive IDE and learning environment.",
    tags: ["Next.js", "React", "TailwindCSS", "Monaco", "Algorithms"],
    url: "https://example.com",
    github: "https://github.com",
    icon: "💻",
  },
  {
    name: "Tailwind Master Kit",
    description:
      "Beautiful, Handcrafted, ready-to-use components and templates for your next Tailwind web app project.",
    tags: ["TailwindCSS", "Components", "Templates"],
    url: "https://example.com",
    github: "https://github.com",
    icon: "🎨",
  },
  {
    name: "DevTools Pro",
    description:
      "A comprehensive suite of developer tools to boost your productivity and streamline your workflow.",
    tags: ["TypeScript", "React", "Node.js", "Developer Tools"],
    url: "https://example.com",
    github: "https://github.com",
    icon: "🔧",
  },
  {
    name: "Portfolio Generator",
    description:
      "Create stunning portfolio websites in minutes with our AI-powered generator. No coding required.",
    tags: ["AI", "Next.js", "TailwindCSS", "Web Generator"],
    url: "https://example.com",
    github: "https://github.com",
    icon: "🎯",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Things I've built and contributed to over the years.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.name} className="h-full hover:shadow-md transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{project.icon}</div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default ProjectsPage;