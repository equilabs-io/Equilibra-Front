import { getStringAfterFirstDash } from "@/lib/format";
import { IdentificationIcon } from "@heroicons/react/24/solid";

export const ProjectIdBadge = ({ id, size }: { id: any; size?: any }) => {
  const idIconSize = {
    sm: "h-6 w-10",
    lg: "h-8 w-12",
  };

  return (
    <>
      <div className="group flex items-center  bg-surface">
        <IdentificationIcon
          className={`${
            idIconSize[size as keyof typeof idIconSize] ?? idIconSize.sm
          }  text-textSecondary transition-colors duration-200 ease-in group-hover:text-textSecondary`}
        />
        <span
          className={`${
            size === "lg" ? "text-lg" : "text-sm"
          } font-semibold text-primary`}
        >
          {getStringAfterFirstDash(id)}
        </span>
      </div>
    </>
  );
};
