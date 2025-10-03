import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Moonbeam",
    description:
      "Never write from scratch again. Kickstart your next great writing piece with Moonbeam. Your long-form writing AI assistant.",
    tags: ["Front-end", "GPT-3", "Next.js", "React", "TailwindCSS", "Chrome Extension"],
    url: "https://example.com",
    icon: "📝",
  },
  {
    name: "Aceternity",
    description:
      "Building modern applications that scale well and are easy to maintain. Cutting edge websites with a pinch of magic, and a lot of love.",
    tags: ["Next.js", "React", "TailwindCSS", "Full-Stack"],
    url: "https://example.com",
    icon: "✨",
  },
  {
    name: "Algochurn",
    description:
      "Practice the most popular algorithmic questions and Front-end interview questions with an interactive IDE and learning environment.",
    tags: ["Next.js", "React", "TailwindCSS", "Monaco", "Algorithms"],
    url: "https://example.com",
    icon: "💻",
  },
  {
    name: "Tailwind Master Kit",
    description:
      "Beautiful, Handcrafted, ready-to-use components and templates for your next Tailwind web app project.",
    tags: ["TailwindCSS", "Components", "Templates"],
    url: "https://example.com",
    icon: "🎨",
  },
];

export const Projects = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-2">{project.icon}</div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
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
          </a>
        ))}
      </div>
    </section>
  );
};