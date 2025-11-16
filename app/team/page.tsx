import React from "react";
import ProfileCard from "./ProfileCard";
import team from "@/data/team";

interface TeamMember {
  name: string;
  job: string;
  image: string;
  links: Array<{
    mastadon?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  }>;
}

export default function App() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold  mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl  max-w-2xl mx-auto">
            talented individuals who make everything possible
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {team.map((member: TeamMember, index: number) => {
            // تبدیل ساختار داده از team.ts به فرمت مورد نیاز ProfileCard
            const links = member.links[0] || {};
            
            return (
              <ProfileCard
                key={index}
                name={member.name}
                role={member.job}
                image={member.image}
                imageAlt={`${member.name} profile picture`}
                socialLinks={{
                  mastodon: links.mastadon || "",
                  twitter: links.twitter || "",
                  linkedin: links.linkedin || "",
                  github: links.github || "",
                  website: links.website || "",
                }}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-500">
            Want to join our team?{" "}
            <a href="#contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}