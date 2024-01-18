import { ManagerHeader } from "@/components/Manager/ManagerHeader";
import ManagerClient from "@/components/Manager/ManagerClient";
import { getUrqlClient } from "@/services/urqlService";

//query to get the participant support to projects
const participantSupportQuery = `
query ($participant: String!) {
  poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
    id    
    support
  }
}
`;
const queryPoolbyOwner = `
query ($owner: String!) {
    osmoticPools(
        first: 100
        where: {owner: $owner}
      ) {
        address
        mimeToken {
          name
          symbol
        }    
        poolProjects(first: 50) {
            id
            poolProjectSupports {
              support
              poolProjectParticipantsSupports {
                support
                participant
              }
            }
            currentRound
            active
            flowLastRate
          }
      }
}

`;

// manager page severs as a "wrapper" for the manager header and manager client
export default async function Manager({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //current conencted address from url params
  const address = searchParams?.query?.toString() ?? "";

  const participantQueryResult = await getUrqlClient().query(
    participantSupportQuery,
    { participant: address },
  );
  const fetchPoolbyOwner = await getUrqlClient().query(queryPoolbyOwner, {
    owner: address,
  });

  const pools = fetchPoolbyOwner.data?.osmoticPools.slice(-3);

  const participantSupports =
    participantQueryResult.data?.poolProjectParticipantSupports;

  return (
    <>
      {/* title - description and triple satck info left section */}
      <ManagerHeader />

      {/* start with: OPEN MANAGER btn - then it opens the actual dashbaord */}
      <ManagerClient pools={pools} />
    </>
  );
}
