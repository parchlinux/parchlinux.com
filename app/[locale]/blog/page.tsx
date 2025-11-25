import React from "react";
import BlogSection from "@/components/custom/main/blog-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogPage = () => {
  const categories = [
    "All",
    "Event",
    "Update",
    "Tutorial",
    "Community",
    "News",
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container max-w-7xl mx-auto py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-3xl font-bold">Blog</h1>
            </div>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="flex h-10 w-full rounded-full border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="container max-w-7xl mx-auto py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        <BlogSection />

        <div className="flex justify-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-2">
            Load More Articles
          </Button>
        </div>
      </main>

      <aside className="container max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3"></div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Gaming",
                  "Steam",
                  "Tutorial",
                  "Update",
                  "Community",
                  "Design",
                  "Development",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Subscribe to Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates and news directly in your inbox.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button className="w-full rounded-full bg-parch">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BlogPage;
