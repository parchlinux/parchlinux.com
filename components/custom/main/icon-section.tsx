import { Card, CardContent } from "@/components/ui/card";
import { CaseSensitive, ChartLine, Lock, Users } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Security",
    description:
      "No telemetry, automatic security updates, hardened configurations and privacy-respecting defaults.",
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
      "One of the most vibrant Persian Linux communities with forum, Matrix rooms, wiki and constant contributions.",
  },
  {
    icon: CaseSensitive,
    title: "Optimized Fonts",
    description:
      "Beautiful optimized Persian fonts, full RTL layout, Jalali calendar, Persian keyboard and Firefox fixes from the first boot.",
  },
];

const IconSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={index}
              className="col-span-1 text-center border-0 shadow-none bg-transparent"
            >
              <CardContent className="p-5 space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 lg:w-16 rounded-full flex items-center justify-center md:mb-2 mb-0">
                  <IconComponent size={48} />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-xs text-foreground/95 mx-auto leading-relaxed sm:max-w-[250px] lg:max-w-[200px]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default IconSection;
