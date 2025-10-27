import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "LearnTrack ",
    description:
      "An online learning platform that helps users track their progress, set goals, and stay motivated throughout their educational journey.",
    tags: ["Backend", "Node.js", "Express", "MongoDB","razorpay"],
    url: "https://github.com/RRashmipanda/LearnTrack",
    icon: "📝",
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
    name: "Animal Aid",
    description:
      "A compassionate platform dedicated to rescuing, rehabilitating, and rehoming animals in need, while promoting animal welfare and responsible pet ownership.",
    tags: [ "React", "TailwindCSS", "TypeScript","MongoDB","Node.js","Express","cloudinary"],
    url: "https://github.com/RRashmipanda/ANIMALAID_CLIENT",
    icon: "💻",
  },
  {
    name: "Blogvibe ",
    description:
      "A blogging platform that allows users to create, share, and discover engaging content across various topics and interests.",
    tags: ["Backend", "Node.js", "Express", "MongoDB","EJS","cloudinary","docker","aws"],
    url: "https://github.com/RRashmipanda/Blogvibe",
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