"use client";
import { useIsMounted } from "@/hooks/useIsMounted";
export default function Home() {
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col justify-between flex-auto font-mono">
        <h1>OMG</h1>
      </div>
    </>
  );
}
