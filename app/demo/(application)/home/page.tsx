"use client";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Link } from "@/components/Link";
import { PlusIcon } from "@heroicons/react/24/outline";

type HomeContentProps = {
  name: string;
  hrefLearnMore: string;
  href: string;
  description: string;
  label: string;
};
const homeContentInfo: HomeContentProps[] = [
  {
    name: "Pools",
    hrefLearnMore: "./",
    href: "./demo/create-pool",
    description: "Dive Into the Funding Ocean",
    label: "New Pool",
  },
  {
    name: "Proyects",
    hrefLearnMore: "./",
    href: "./demo/create-project",
    description: "The Next Web3 Giants",
    label: "New Project",
  },
];

export default function Home() {
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <main className="flex flex-col justify-between flex-auto space-y-16">
        <div className="flex flex-col space-y-4 max-w-2xl">
          <h2 className="text-primary">Get involved:</h2>
          <p className="text-lg font-mono">
            Bring your community ecosystem to the next level by creating its own
            Pool & Supporting your favorite Proyects
          </p>
        </div>
        <div className="w-full space-y-10">
          {homeContentInfo.map((info) => (
            <HomeContent info={info} key={info.label} />
          ))}
        </div>
      </main>
    </>
  );
}

const HomeContent = ({ info }: { info: HomeContentProps }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-primary">{info.name}</h2>
        {/* TODO: put href to pools docs */}
        <Link href={`/${info.hrefLearnMore}`} isExternal>
          Learn more
        </Link>
      </div>

      <span className="sr-only">Content</span>
      <div className="border border-dashed h-fit font-mono rounded-xl py-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="var(--color-primary)"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 font-semibold">{info.description}</h3>
          <p className="mt-1 text-md">
            Get started by creating a {info.label}.
          </p>
          <div className="mt-6">
            <Link href={`/${info.href}`}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-xl font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                {info.label}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
