import React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { TwitterIcon, GitHubIcon } from "./SocialMediaIcons";

export const socialMediaProfilesInfo = [
  { title: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  {
    title: "GitHub",
    href: "https://github.com/Lucianosc/Equilibra-Front",
    icon: GitHubIcon,
  },
];

export const Footer = () => {
  return (
    <footer className="mx-auto w-full flex flex-col max-w-7xl items-center justify-evenly p-6 lg:px-8 h-32">
      <SocialMediaIcons socialMediaProfiles={socialMediaProfilesInfo} />
      <div className="text-primary font-thin">
        © 2023 Equilibra, All Rights Reserved
      </div>
    </footer>
  );
};
