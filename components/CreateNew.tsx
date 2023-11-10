import React from "react";
import Link from "next/link";

type CreateNewProps = {
  label: string;
};

export const CreateNew: React.FC<CreateNewProps> = ({ label }) => {
  return (
    <div className="w-full flex items-center justify-end mb-10 sticky top-0 bg-background z-20 py-4">
      <Link
        href={`/demo/create-${label}`}
        // href={`/demo/create-${nextUrlPath}`}
        className="font-mono text-center text-3xl rounded-md px-4 py-2"
      >
        <button className="px-6 py-2 font-medium bg-surface w-fit transition-all shadow-[-3px_3px_0px_white] hover:shadow-none hover:translate-x-[-3px] hover:translate-y-[3px] hover:text-primary">
          CREATE NEW {label.toUpperCase()}
        </button>
      </Link>
    </div>
  );
};
