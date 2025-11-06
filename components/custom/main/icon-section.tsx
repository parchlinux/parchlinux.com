import { Card, CardContent } from "@/components/ui/card";
import { CaseSensitive, ChartLine, Lock, Users } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Security",
    description:
      "Built with security in mind, featuring regular updates and a robust firewall.",
  },
  {
    icon: ChartLine,
    title: "Performance",
    description:
      "Optimized for speed and efficiency, Parch runs smoothly on a wide range of hardware.",
  },
  {
    icon: Users,
    title: "Community Centric",
    description:
      "Our distribution aims to create an active, collaborative community where every user can shape the project's future.",
  },
  {
    icon: CaseSensitive,
    title: "Optimized Fonts",
    description:
      "An unparalleled experience with optimized Persian fonts for enhanced readability and aesthetics.",
  },
];

const IconSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={index}
              className="xl:col-span-1 sm:col-span-2 col-span-4 text-center border-0 shadow-none"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <IconComponent size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <div className="space-y-2 ">
                  <p className="text-muted-foreground text-xs mx-auto leading-relaxed xl:max-w-[250px] max-w-[200px]">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default IconSection;
