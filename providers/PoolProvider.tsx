import { createContext } from "react";

interface Pool  {
  name: string;
  description: string;
  token: string;
  govToken: string;
  elegibleProjects: string[];
  supporting: number;
  available: number;
  streaming: number;
  streamed: number;
  streams: {
    [key: string]: {
      streamed: number;
      streaming: number;
    };
  };
};

const pools: Pool[] = [
  {
    name: "Pool 1",
    description:
      "Community of builders and contributors who are working to build a more sustainable and equitable future for all.",
    token: "OP",
    govToken: "OP",
    supporting: 1000,
    available: 7000,
    streaming: 2000,
    streamed: 5000,
    elegibleProjects: ["One", "Two", "Three"],
    streams: {
      One: {
        streamed: 1000,
        streaming: 80,
      },
      Two: {
        streamed: 1000,
        streaming: 80,
      },
      Three: {
        streamed: 1000,
        streaming: 80,
      },
    },
  },
  {
    name: "Pool 2",
    description:
      "Providing the tools and infrastructure to create and manage decentralized organizations.",
    token: "USDC",
    govToken: "DAO-t",
    supporting: 10000,
    available: 100000,
    streaming: 20000,
    streamed: 50000,
    elegibleProjects: ["One", "Four", "Five"],
    streams: {
      One: {
        streamed: 2000,
        streaming: 8000,
      },
      Four: {
        streamed: 10000,
        streaming: 5000,
      },
      Five: {
        streamed: 1000,
        streaming: 12000,
      },
    },
  },
];
export const PoolContext = createContext({ pools });

export const PoolProvider = ({ children }: any) => {
  return (
    <PoolContext.Provider value={{ pools }}>{children}</PoolContext.Provider>
  );
};
