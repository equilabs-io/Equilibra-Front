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
  {
    name: "Vero",
    role: "UX/UI Designer",
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
    <div className="bg-gray-900 py-24 rounded-2xl">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight spacing text-primary sm:text-4xl">
            Meet our pioneers
          </h2>
          <p className="mt-4 text-lg leading-8 text-textSecondary">
            An amazing web3 team supercharged to push the boundaries of
            innovation.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {equilibraTeam.map((person) => (
            <li
              key={person.name}
              className="rounded-2xl bg-background px-8 py-10 hover:border-[1px] hover:border-primary"
            >
              {person.imageUrl && (
                <div className="mx-auto h-48 w-48 md:h-56 md:w-56 relative">
                  <Image
                    src={person.imageUrl}
                    alt=""
                    layout="fill"
                    objectFit="fit"
                    className="rounded-full "
                  />
                </div>
              )}

              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-400">{person.role}</p>
              <ul role="list" className="mt-6 flex justify-center gap-x-6">
                <SocialMediaIcons
                  socialMediaProfiles={person.socialMedia ?? []}
                />
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
