import { Card, CardContent } from "@/components/ui/card";
import { CaseSensitive, ChartLine, Lock, Users } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  {
    icon: Lock,
    titleKey: "security",
    descriptionKey: "securityDescription",
  },
  {
    icon: ChartLine,
    titleKey: "performance",
    descriptionKey: "performanceDescription",
  },
  {
    icon: Users,
    titleKey: "communityCentric",
    descriptionKey: "communityCentricDescription",
  },
  {
    icon: CaseSensitive,
    titleKey: "optimizedFonts",
    descriptionKey: "optimizedFontsDescription",
  },
];

const IconSection = () => {
  const t = useTranslations("IconSection");

  return (
    <div className="w-full max-w-360 mx-auto pt-16 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={index}
              className="col-span-1 text-center border-0 shadow-none bg-transparent"
            >
              <CardContent className="p-5 space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 lg:w-16 rounded-full flex items-center justify-center md:mb-1.5 mb-0 relative">
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient
                        id={`gradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#21c796" />
                        <stop offset="50%" stopColor="#0385ce" />
                        <stop offset="100%" stopColor="#0d40bf" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <IconComponent
                    size={48}
                    stroke={`url(#gradient-${index})`}
                    className="drop-shadow-sm"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-xl font-semibold text-foreground">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm lg:text-xs text-foreground/95 mx-auto leading-relaxed sm:max-w-[250px] lg:max-w-[200px] font-light">
                  {t(feature.descriptionKey)}
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
