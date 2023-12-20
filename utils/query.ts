export const listQuery = `query($owner: String!)
{
    projectLists(where: {owner: $owner}) {
      id
      name
    }
  }`;
