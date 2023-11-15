import ProjectRegistryAbi from "./ProjectRegistry.json";
import PoolAbi from "./Pool.json";

interface ContractInterface {
  abi: any;
  contractName: string;
  address: `0x${string}`;
}

export const projectRegistry: ContractInterface = {
  abi: ProjectRegistryAbi,
  contractName: "ProjectRegistry",
  address: "0xFb5Ff528E295a39b1ba0b053FF7cA410396932c0",
};

export const supportProjects: ContractInterface = {
  abi: PoolAbi,
  contractName: "Pool",
  address: "0x",
};
