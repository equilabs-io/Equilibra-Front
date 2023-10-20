"use client";

import { useMemo } from "react";
import {
  UrqlProvider as Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";

// urql provider for client components

//Subgraph URL
const subgraphURL =
  "https://api.thegraph.com/subgraphs/name/blossomlabs/osmoticfund-goerli";

export default function UrqlProvider({ children }: React.PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: subgraphURL,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  return (
    <Provider client={client} ssr={ssr}>
      {children}
    </Provider>
  );
}
