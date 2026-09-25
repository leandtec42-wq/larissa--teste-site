// Model layer entry point — a single shared Prisma Client instance.
// Every other file in lib/models/*.js imports `prisma` from here; nothing
// outside lib/ talks to the database directly.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
