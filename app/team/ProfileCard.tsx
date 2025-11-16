import React from "react";
import { Github, Linkedin, Globe } from "lucide-react";

interface SocialLinks {
  mastodon?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
  socialLinks: SocialLinks;
}

const ProfileCard = ({
  name,
  role,
  image,
  imageAlt,
  socialLinks,
}: ProfileCardProps) => {
  const activeIcons = Object.values(socialLinks).filter(link => link && link !== "#").length;
  
  return (
    <div className="w-full max-w-96 bg-[#D2E5F4] rounded-2xl p-5 relative">
      <div className="mb-4 text-left">
        <h2 className="text-xl font-bold tracking-snug text-slate-900">{name}</h2>
        <p className="text-slate-600 font-medium mt-1">{role}</p>
      </div>

      <div className="relative mb-6">
        <div className="relative rounded-xl overflow-hidden aspect-square">
          <img
            src={image}
            alt={imageAlt || `${name} profile picture`}
            className="w-full h-full object-cover"
          />
          
          <div 
            className="absolute bottom-0 right-0 bg-[#D2E5F4] p-3 rounded-tl-3xl flex gap-2 bottom-[-10px]"
            style={{
              minWidth: `${Math.max(3, activeIcons) * 44}px`,
            }}
          >
            {socialLinks.mastodon && socialLinks.mastodon !== "#" && (
              <a
                href={socialLinks.mastodon}
                className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="Mastodon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.647-1.501 1.927v2.791h-2.069V9.364c0-1.28-.501-1.927-1.502-1.927-.905 0-1.357.546-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z" />
                </svg>
              </a>
            )}

            {socialLinks.twitter && socialLinks.twitter !== "#" && (
              <a
                href={socialLinks.twitter}
                className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="Twitter/X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            {socialLinks.linkedin && socialLinks.linkedin !== "#" && (
              <a
                href={socialLinks.linkedin}
                className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            )}

            {socialLinks.github && socialLinks.github !== "#" && (
              <a
                href={socialLinks.github}
                className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            )}

            {socialLinks.website && socialLinks.website !== "#" && (
              <a
                href={socialLinks.website}
                className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="Website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;