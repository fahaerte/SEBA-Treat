export const getEncodedString = (...args: string[]) => {
  return args.join("-").replace(/\s+/g, "-").toLowerCase();
};
