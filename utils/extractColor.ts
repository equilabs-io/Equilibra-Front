export const extractColor = (hexStr: string) => {
  if (!hexStr.length) {
    return "";
  }
  return `#${hexStr.substring(2, 8)}`;
};
