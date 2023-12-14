export type PoolProps = {
  name?: string;
  id: string;
  maxActiveProjects: number;
  address: string;
  mimeToken: {
    name: string;
  };
};

export type PoolCardProps = {
  id: any;
  name: string | undefined;
  pool: PoolProps[];
};
