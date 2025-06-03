import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

/* eslint-disable no-var */
declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}
/* eslint-enable no-var */

const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
