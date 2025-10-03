import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const blogs = [
  {
    title: "Ace the Javascript Interview - Practical questions to help you clear your next interview",
    views: "18,172",
    slug: "ace-javascript-interview",
    date: "March 15, 2024",
    excerpt: "Master the most common JavaScript interview questions and land your dream job.",
  },
  {
    title: "Free portfolio website template that gets you hired in 2021",
    views: "6,243",
    slug: "developer-portfolio-website",
    date: "January 10, 2024",
    excerpt: "A complete guide to building a portfolio that stands out to recruiters.",
  },
  {
    title: "Understanding React Hooks in 2024",
    views: "12,543",
    slug: "react-hooks-guide",
    date: "February 5, 2024",
    excerpt: "A comprehensive guide to using React Hooks effectively in your applications.",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Thoughts on software development, design, and more.
        </p>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <Card key={blog.slug} className="p-6 hover:shadow-md transition-shadow">
              <Link to={`/blog/${blog.slug}`}>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold hover:text-accent transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{blog.date}</p>
                  <p className="text-muted-foreground leading-relaxed">{blog.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <span>{blog.views} views</span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Blog;