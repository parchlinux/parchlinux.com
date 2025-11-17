import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import blogPosts from "@/data/blog";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  link: string;
  badgeColor: string;
}

const BlogSection = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-24 px-4">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-2xl sm:text-3xl font-bold">Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {blogPosts.map((post: BlogPost) => (
            <Card
              key={post.id}
              className="rounded-lg gap-4 bg-secondary border-secondary"
            >
              <CardHeader>
                <CardDescription className="text-md font-bold">
                  {post.date}
                </CardDescription>
                <CardAction className="flex flex-wrap gap-1.5">
                  <span className="mb-1 text-gray-400">&#8226;</span>
                  <Badge className={`rounded-full px-3 bg-parch`}>
                    {post.category}
                  </Badge>
                </CardAction>
              </CardHeader>

              <CardContent>
                <CardTitle className="text-lg font-bold mb-1">
                  {post.title}
                </CardTitle>
              </CardContent>

              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {post.description}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
