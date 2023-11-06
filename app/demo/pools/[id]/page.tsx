import { NextPage } from "next";

interface Params {
  id: string;
}

const PoolId: NextPage<{ params: Params }> = ({ params }) => {
  return <div className="">{params.id}</div>;
};

export default PoolId;
