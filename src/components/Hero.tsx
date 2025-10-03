// import avatar from "@/assets/avatar.jpg";
import { ExternalLink } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-16">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Your Name</h1>
          <p className="text-xl text-foreground mb-2">
            Building{" "}
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Amazing Projects
            </a>
            ,{" "}
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Cool Products
            </a>{" "}
            & other cool things
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Senior Software Engineer building SaaS products and web apps. Find me on{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              twitter
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            for tech updates and memes.
          </p>
        </div>
        <div className="shrink-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src={"https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-2xl border-2 border-border hover:border-accent transition-colors cursor-pointer"
            />
          </a>
        </div>
      </div>
    </section>
  );
};