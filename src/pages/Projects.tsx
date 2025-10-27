import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    name: "PMP",
    description:
      "project management platform that streamlines team collaboration, task tracking, and project planning for enhanced productivity.",
    tags: ["Backend", "Node.js","Typescript", "Express", "MongoDB","razorpay"],
    url: "https://github.com/RRashmipanda/pmp",
    icon: "📝",
  },
  {
    name: "Easy Resume Maker",
    description:
      "AI-powered resume builder that helps users create professional resumes quickly and easily.",
    tags: ["Next.js", "React", "TailwindCSS", "Full-Stack"],
    url: "https://github.com/RRashmipanda/EasyResumeMaker",
    github: "https://github.com/RRashmipanda/EasyResumeMaker",
    icon: "✨",
  },
  {
    name: "Animal Aid",
    description:
      "A compassionate platform dedicated to rescuing, rehabilitating, and rehoming animals in need, while promoting animal welfare and responsible pet ownership.",
    tags: [ "React", "TailwindCSS", "TypeScript","MongoDB","Node.js","Express","cloudinary"],
    url: "https://github.com/RRashmipanda/ANIMALAID_CLIENT",
    icon: "💻",
  },
  {
    name: "E-Voting System",
    description:
      "A secure and transparent e-voting system that enables users to cast their votes online with confidence and ease.",
    tags: ["TailwindCSS", "Components", "Templates"],
    url: "https://github.com/RRashmipanda/E-Voting",
    github: "https://github.com/RRashmipanda/E-Voting",
    icon: "🗳️",
  },
  {
    name: "Vide_editor ",
    description:
      "Ai-powered video editing platform that simplifies the video creation process with intuitive tools and smart features.",
    tags: ["Next.js", "React", "TailwindCSS", "prisma","ollama","shadcn/ui","mongoDB","authjs"],
    url: "https://github.com/RRashmipanda/vide_editor",
    icon: "✨",
  },
  {
    name: "Giffy",
    description:
      "An AI-powered GIF generator that creates fun and engaging GIFs from user inputs.",
    tags: ["AI", "Next.js", "TailwindCSS", "Web Generator"],
    url: "rrgiphy.netlify.app",
    github: "https://github.com/RRashmipanda/Giffy",
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