import {
  ClipboardDocumentListIcon,
  ChartPieIcon,
  UserCircleIcon,
  FolderIcon,
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
  { name: "Home", href: "/demo", icon: HomeIcon, current: false },
  {
    name: "Pools",
    icon: RectangleGroupIcon,
    current: false,
    children: [
      { name: "Create Pool", href: "/demo/create-pool", current: false },
      { name: "View all", href: "/demo/pools", current: false },
    ],
  },
  {
    name: "Projects",
    icon: ClipboardDocumentListIcon,
    current: false,
    children: [
      { name: "Create Project", href: "/demo/create-project", current: false },
      { name: "View all", href: "/demo/projects", current: false },
    ],
  },
  { name: "Profile", href: "", icon: UserCircleIcon, current: false },
];
