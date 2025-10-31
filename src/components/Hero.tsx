import { Download } from "lucide-react";
import { ExternalLink } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-16">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Rashmi ranjan panda</h1>
          <p className="text-xl text-foreground mb-2">
            Building{" "}
            <a
              href="https://github.com/RRashmipanda"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Amazing Projects
            </a>
            
            , other cool things
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fullstack developer building SaaS products and web apps. Find me on{" "}
            <a
              href="https://www.linkedin.com/in/rashmi-ranjan-panda-5b3776209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              linkdein
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            for tech updates and memes.
          </p>
        </div>
       <div className="shrink-0 flex flex-col items-center">
  <a href="https://x.com/PandaRashm16540?t=flqtqnmmlkVZIhblGaoAsA&s=08" target="_blank" rel="noopener noreferrer">
    <img
      src={"/photo.jpg"}
      alt="Profile"
      className="w-32 h-32 rounded-2xl border-2 border-border hover:border-accent transition-colors cursor-pointer"
    />
  </a>
  <a
    href="/resume.pdf"
    download
    className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full border border-border 
               hover:bg-accent hover:text-white transition-all duration-300"
  >
    <Download className="h-3 w-3" />
    <span>Resume</span>
  </a>
</div>



      </div>
    </section>
  );
};