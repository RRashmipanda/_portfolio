import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const blogs = [
  {
    title: "Ace the Javascript Interview - Practical questions to help you clear your next interview",
    views: "18,172",
    slug: "ace-javascript-interview",
  },
  {
    title: "Free portfolio website template that gets you hired in 2021",
    views: "6,243",
    slug: "developer-portfolio-website",
  },
];

export const RecentBlogs = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">Recent Blogs</h2>
      <div className="space-y-4 mb-6">
        {blogs.map((blog) => (
          <Card
            key={blog.slug}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <Link to={`/blog/${blog.slug}`} className="block">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-medium leading-snug flex-1">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                  <span className="text-sm">{blog.views} views</span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
      <Link
        to="/blog"
        className="text-accent hover:underline font-medium inline-block"
      >
        See All Blogs →
      </Link>
    </section>
  );
};