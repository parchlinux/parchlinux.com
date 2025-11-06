import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "lucide-react";

const BlogSection = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-24">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-2xl font-bold">Blog</h2>
        <div className="grid grid-cols-12 gap-4">
          <Card className="xl:col-span-4 col-span-6 rounded-lg gap-4 bg-secondary border-secondary">
            <CardHeader>
              <CardDescription className="text-md font-bold">
                Thu, 08 May 2025
              </CardDescription>
              <CardAction className="flex gap-1.5">
                <Badge className="rounded-full px-3 bg-amber-300">
                  <Link />
                </Badge>
                <span className="mb-1 text-gray-400">&#8226;</span>
                <Badge className="rounded-full px-3 bg-parch">Event</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold mb-1">
                How play game on Parch with steam?
              </p>
            </CardContent>
            <CardFooter>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s...
              </p>
            </CardFooter>
          </Card>
          <Card className="xl:col-span-4 col-span-6 rounded-lg gap-4 bg-secondary border-gray">
            <CardHeader>
              <CardDescription className="text-md font-bold">
                Thu, 15 May 2025
              </CardDescription>
              <CardAction className="flex gap-1.5">
                <Badge className="rounded-full px-3 bg-amber-300">
                  <Link />
                </Badge>
                <span className="mb-1 text-gray-400">&#8226;</span>
                <Badge className="rounded-full px-3 bg-parch">Event</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold mb-1">
                Annual Parch meetup - in person
              </p>
            </CardContent>
            <CardFooter>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s...
              </p>
            </CardFooter>
          </Card>
          <Card className="xl:col-span-4 col-span-6 rounded-lg gap-4 bg-secondary border-gray">
            <CardHeader>
              <CardDescription className="text-md font-bold">
                Thu, 22 May 2025
              </CardDescription>
              <CardAction className="flex gap-1.5">
                <Badge className="rounded-full px-3 bg-amber-300">
                  <Link />
                </Badge>
                <span className="mb-1 text-gray-400">&#8226;</span>
                <Badge className="rounded-full px-3 bg-parch">Event</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold mb-1">
                Product design insights - panel
              </p>
            </CardContent>
            <CardFooter>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s...
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
