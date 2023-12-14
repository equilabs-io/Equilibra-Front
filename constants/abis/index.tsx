import ProjectRegistryAbi from "./ProjectRegistry.json";
import OsmoticControllerAbi from "./OsmoticController.json";
import PoolAbi from "./Pool.json";

const OSMOTIC_CONTROLLER_ADDRESS = "0x0b9f52138050881C4d061e6A92f72d8851B59F8e";

interface ContractInterface {
  abi: any;
  contractName?: string;
  address?: `0x${string}`;
  functionName?: string;
  args?: any[];
}

export const osmoticControllerCreatePool: ContractInterface = {
  address: OSMOTIC_CONTROLLER_ADDRESS,
  abi: OsmoticControllerAbi,
  functionName: "createOsmoticPool",
  args: [],
};

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
