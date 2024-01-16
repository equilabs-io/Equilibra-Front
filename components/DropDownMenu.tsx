import { Fragment, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useHover } from "@/hooks/useHover";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type MenuItemProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  isLast?: boolean;
};

// TODO: separate navItem into it own component
const DropDownMenu: FC<MenuItemProps> = function ({
  href,
  label,
  icon,
  isLast = false,
}) {
  return (
    <Popover.Button as={Link} href={href}>
      <div
        className={`bg-surface px-4 py-2 transition-all hover:brightness-150`}
      >
        {icon}
        <div className="text-md">{label}</div>
      </div>
    </Popover.Button>
  );
};

const NavItemBase: FC<{
  label: ReactNode;
  icon: ReactNode;
  isHovered: boolean;
}> = function ({ label, icon, isHovered }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        isHovered ? "opacity-90" : ""
      }   text-md letter-spacing-[1px] font-bold uppercase transition-colors`}
    >
      {/* If we wanna render in Icon next to the label */}
      <div className="h-4 w-4">{icon}</div>
      {label}
    </div>
  );
};

type NavItemProps = {
  label: string;
  icon?: ReactNode;
  menuItems?: { label: string; href: string; icon?: ReactNode }[];
  href?: string;
};

export const NavItem: FC<NavItemProps> = function ({
  label,
  menuItems,
  icon,
  href,
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(popoverRef);
  const hasItems = menuItems && !!menuItems.length;

  if (href && !hasItems) {
    return (
      <div ref={popoverRef}>
        <Link href={href}>
          <NavItemBase label={label} icon={icon} isHovered={isHovered} />
        </Link>
      </div>
    );
  }

  return (
    <Popover ref={popoverRef} className="relative">
      {() => {
        return (
          <>
            <Popover.Button>
              <NavItemBase
                label={
                  <>
                    {label}
                    <ChevronDownIcon
                      className={`h-3 w-3 font-bold group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </>
                }
                icon={icon}
                isHovered={isHovered}
              />
              <div className="absolute h-4 w-full" />
            </Popover.Button>

            {hasItems && (
              <Transition
                show={isHovered}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute top-8 z-10 w-44" static>
                  <div className="rounded-lg border-2 border-grey_mdark">
                    <div className="flex flex-col divide-y-2 divide-grey_mdark">
                      {menuItems.map((item, index) => (
                        <DropDownMenu
                          key={index}
                          href={item.href}
                          label={item.label}
                          icon={item.icon}
                          isLast={index === menuItems.length - 1}
                        />
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </>
        );
      }}
    </Popover>
  );
};

// TODO: add animation
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
