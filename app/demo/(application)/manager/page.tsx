import { ManagerHeader } from "@/components/ManagerHeader";
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

// Manager server Component
export default async function Manager({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const address = searchParams?.query?.toString() ?? "";
  console.log("address", address);

  const participantQueryResult = await getUrqlClient().query(
    participantSupportQuery,
    { participant: address },
  );

  const participantSupports =
    participantQueryResult.data.poolProjectParticipantSupports;

  console.log("participantSupports", participantSupports);

  return (
    <>
      <ManagerHeader />
    </>
  );
}
