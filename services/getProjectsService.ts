import { getUrqlClient } from "@/services/urqlService";
import { ethers } from "ethers";

const projectsQuery = `
  query {
    projects(skip: 2, first: 5) {
        admin
        id
        beneficiary
        contentHash
    }
  }
`;

interface Project {
  admin: string;
  beneficiary: string;
  contentHash: string;
  id: string;
  __typename: string;
}

const getIpfsData = async (hash: string) => {
  try {
    const res = await fetch(`${process.env.PINATA_GATEWAY_URL}${hash}`);
    if (res.ok) return await res.json();
    else return undefined;
  } catch (error) {
    console.log(error);
  }
};

const getParsedProjects = async (projectsQuery: { projects: Project[] }) => {
  const abiCoder = new ethers.utils.AbiCoder();

  const projects = projectsQuery?.projects.map((project) => {
    try {
      return {
        ...project,
        contentHash: abiCoder.decode(["string"], project.contentHash)[0],
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

  const parsedProjects = await Promise.all(
    projects.map(async (project) => {
      if (project) {
        try {
          return {
            ...project,
            content: await getIpfsData(project.contentHash),
          };
        } catch (error) {
          console.log(error);
        }
      }
    })
  );

  const filteredProjects = parsedProjects.filter((project) =>
    Boolean(project?.content?.fileHash)
  );

  return filteredProjects;
};

export const getProjects = async () => {
  const projectsQueryResult = await getUrqlClient().query(projectsQuery, {});

  return await getParsedProjects(projectsQueryResult.data);
};
