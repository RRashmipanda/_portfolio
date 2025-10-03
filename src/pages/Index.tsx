import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { RecentBlogs } from "@/components/RecentBlogs";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <RecentBlogs />
        <Projects />
        <Footer />
      </main>
    </div>
  );
};

export default Index;