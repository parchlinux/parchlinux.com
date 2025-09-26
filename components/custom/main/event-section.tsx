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

const EventSection = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-2xl font-bold">Events</h2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription className="text-md">
              Thu, 08 May 2025
            </CardDescription>
            <CardAction className="flex gap-2">
              <Badge className="rounded-full">
                <Link />
              </Badge>
              <span className="mb-1 text-muted">&#8226;</span>
              <Badge className="rounded-full">Event</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="">Parch summer release - webinar</p>
          </CardContent>
          <CardFooter>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </p>
          </CardFooter>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription className="text-md">
              Thu, 08 May 2025
            </CardDescription>
            <CardAction className="flex gap-2">
              <Badge className="rounded-full">
                <Link />
              </Badge>
              <span className="mb-1 text-muted">&#8226;</span>
              <Badge className="rounded-full">Event</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="">Parch summer release - webinar</p>
          </CardContent>
          <CardFooter>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </p>
          </CardFooter>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription className="text-md">
              Thu, 08 May 2025
            </CardDescription>
            <CardAction className="flex gap-2">
              <Badge className="rounded-full">
                <Link />
              </Badge>
              <span className="mb-1 text-muted">&#8226;</span>
              <Badge className="rounded-full">Event</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="">Parch summer release - webinar</p>
          </CardContent>
          <CardFooter>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EventSection;
