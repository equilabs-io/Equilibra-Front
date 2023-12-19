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
      
        poolProjects(first: 10) {
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

// Manager server Component
export default async function Manager({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
      <ManagerHeader />
      <ManagerClient pools={pools} />
    </>
  );
}
