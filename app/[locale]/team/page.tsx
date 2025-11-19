import React from "react";
import ProfileCard from "./ProfileCard";
import team from "@/data/team";
import Link from "next/link";
import { useLocale } from "next-intl";

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
  const locale = useLocale();

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-center text-3xl font-bold mb-12">Our team</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {team.map((member: TeamMember, index: number) => {
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
      <span className="font-bold text-justify lg:text-sm text-xs">
        There are many more people who have contributed to Parch linux. A full
        list of contributors can be{" "}
        <Link href={`/${locale}/contributors`} className="text-parch">
          found here
        </Link>
        .
      </span>
    </div>
  );
}
