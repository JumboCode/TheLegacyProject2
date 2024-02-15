import { Resource } from "@prisma/client";

/**
 * Compare resource by alphabetical order.
 */
export const compareResource = (x: Resource, y: Resource) => {
  if (x.title > y.title) {
    return 1;
  } else if (x.title < y.title) {
    return -1;
  }
  return 0;
};
