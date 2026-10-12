import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Linkedin, Github, Globe } from "lucide-react";
import Link from "next/link";

export interface SocialLinks {
  mastodon?: string;
  mastadon?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
  socialLinks: SocialLinks;
}

// Simple role categorizer for visual distinction matching download badges
function getRoleBadgeVariant(role: string) {
  const normalized = role.toLowerCase();
  if (normalized.includes("founder") || normalized.includes("leader")) {
    return "bg-primary/15 text-primary border-primary/30";
  }
  if (
    normalized.includes("maintainer") ||
    normalized.includes("engineer") ||
    normalized.includes("developer")
  ) {
    return "bg-parch-blue/15 text-parch-blue border-parch-blue/30";
  }
  if (normalized.includes("designer") || normalized.includes("editor")) {
    return "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30";
  }
  return "bg-muted text-muted-foreground border-border/60";
}

const TeamCard = ({
  name,
  role,
  image,
  imageAlt,
  socialLinks,
}: TeamCardProps) => {
  const mastodonUrl = socialLinks.mastodon || socialLinks.mastadon;
  const badgeStyle = getRoleBadgeVariant(role);

  return (
    <Card className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Top Profile Content */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar with refined container & subtle hover zoom */}
        <div className="relative shrink-0 p-1 rounded-2xl bg-muted/60 border border-border/40 group-hover:border-primary/40 transition-colors">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted/40">
            <Image
              src={image}
              alt={imageAlt || `${name} profile picture`}
              fill
              sizes="(max-width: 640px) 112px, 128px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Identity Details */}
        <div className="space-y-1.5 w-full">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {name}
          </h3>
          <div>
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-0.5 font-medium rounded-md ${badgeStyle}`}
            >
              {role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom Social Links Dock */}
      <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-center gap-2">
        {mastodonUrl && mastodonUrl !== "#" && (
          <Link
            href={mastodonUrl}
            className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-primary/15 text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/30 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="Mastodon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.647-1.501 1.927v2.791h-2.069V9.364c0-1.28-.501-1.927-1.502-1.927-.905 0-1.357.546-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z" />
            </svg>
          </Link>
        )}

        {socialLinks.twitter && socialLinks.twitter !== "#" && (
          <Link
            href={socialLinks.twitter}
            className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-primary/15 text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/30 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="X / Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
        )}

        {socialLinks.linkedin && socialLinks.linkedin !== "#" && (
          <Link
            href={socialLinks.linkedin}
            className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-primary/15 text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/30 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
        )}

        {socialLinks.github && socialLinks.github !== "#" && (
          <Link
            href={socialLinks.github}
            className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-primary/15 text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/30 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
          </Link>
        )}

        {socialLinks.website && socialLinks.website !== "#" && (
          <Link
            href={socialLinks.website}
            className="w-9 h-9 rounded-xl bg-muted/60 hover:bg-primary/15 text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/30 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="Website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="w-4 h-4" />
          </Link>
        )}
      </div>
    </Card>
  );
};

export default TeamCard;
