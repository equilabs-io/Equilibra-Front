export function formatAddress(
  address: `0x${string}` | string | undefined,
  charsLength = 4,
) {
  const prefixLength = 2; // "0x"
  if (!address) {
    return "";
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    " … " +
    address.slice(-charsLength)
  );
}

export function getStringAfterFirstDash(str: string): string {
  if (typeof str !== "string") {
    return str;
  }

  const index = str.indexOf("-");
  if (index !== -1) {
    return str.slice(index + 1);
  } else {
    return str;
  }
}
