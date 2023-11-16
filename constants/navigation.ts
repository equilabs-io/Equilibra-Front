import {
  ClipboardDocumentListIcon,
  UserCircleIcon,
  HomeIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

export const oldNavs = [
  {
    name: "Pools",
    link: "/app/create-pool",
  },
  {
    name: "Projects",
    link: "/app/create-project",
  },
  {
    name: "Stake",
    link: "/app/projects",
  },
];

export const navItems = [
  { name: "Home", href: "/demo/home", icon: HomeIcon, current: false },
  {
    name: "Pools",
    href: "/demo/pools",
    icon: RectangleGroupIcon,
    current: false,
  },
  {
    name: "Projects",
    href: "/demo/projects",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
  {
    name: "Dashboard",
    href: "/demo/dashboard",
    icon: UserCircleIcon,
    current: false,
  },
];
