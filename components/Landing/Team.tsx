import {
  TwitterIcon,
  LinkedInIcon,
  GitHubIcon,
  SocialMediaIcons,
} from "../SocialMediaIcons";
import Image from "next/image";

const equilibraTeam = [
  {
    name: "Mati",
    role: "FullStack Developer",
    imageUrl: "/logo.png",
    socialMedia: [
      { title: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
      {
        title: "GitHub",
        href: "https://github.com/Mati0X",
        icon: GitHubIcon,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com",
        icon: LinkedInIcon,
      },
    ],
  },
  {
    name: "Lucho",
    role: "Frontend Developer",
    imageUrl: "/lucho-profile.jpg",
    socialMedia: [
      {
        title: "Twitter",
        href: "https://twitter.com/LuchoSca",
        icon: TwitterIcon,
      },
      {
        title: "GitHub",
        href: "https://github.com/Lucianosc",
        icon: GitHubIcon,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/luciano-scaminaci/",
        icon: LinkedInIcon,
      },
    ],
  },
  {
    name: "Vero",
    role: "UX/UI Designer",
    imageUrl: "/vero-profile.jpg",
    socialMedia: [
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/verónica-blanco-313890108/",
        icon: LinkedInIcon,
      },
    ],
  },
  {
    name: "Fede",
    role: "Solidity Engineer",
    imageUrl: "/logo.png",
    socialMedia: [
      { title: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
      {
        title: "GitHub",
        href: "https://github.com",
        icon: GitHubIcon,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com",
        icon: LinkedInIcon,
      },
    ],
  },
];

export const Team = () => {
  return (
    <div className="bg-gray-900 py-16 sm:py-20 rounded-md mx-auto mt-20">
      <div className=" max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            We’re a dynamic group of web3 enthusiasts ready to push the
            boundaries of innovation.
          </p>
        </div>
        <ul
          role="list"
          className="flex flex-wrap justify-center gap-x-8 gap-y-10 mt-16 text-center"
        >
          {equilibraTeam.map(({ name, imageUrl, role, socialMedia }) => (
            <li key={name} className="w-[180px]">
              <Image
                width={240}
                height={240}
                className="mx-auto h-32 w-32 rounded-full object-cover"
                src={imageUrl}
                alt="team member photo"
              />
              <h3 className="mt-4 text-base font-semibold leading-7 tracking-tight text-white">
                {name}
              </h3>
              <p className="text-sm leading-6 text-gray-400">{role}</p>
              <SocialMediaIcons socialMediaProfiles={socialMedia ?? []} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
