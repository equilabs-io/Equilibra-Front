"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { useDebounce } from "../hooks/useDebounce";

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();

  const [text, setText] = useState(search);
  const query = useDebounce(text, 750);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!query) {
      router.push("/demo/projects");
    } else {
      router.push(`/demo/projects?search=${query}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mx-auto max-w-md rounded-md border-2 shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center  pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          value={text}
          placeholder="Search movies..."
          onChange={(e) => setText(e.target.value)}
          className="block w-full rounded-md border-0 bg-surface py-1.5 pl-10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </form>
  );
};

export default Search;
