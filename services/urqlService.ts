import { cacheExchange, fetchExchange, createClient } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

const subgraphURL =
  "https://api.thegraph.com/subgraphs/name/blossomlabs/osmoticfund-goerli";

const makeClient = () => {
  return createClient({
    url: subgraphURL,
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const { getClient: getUrqlClient } = registerUrql(makeClient);
