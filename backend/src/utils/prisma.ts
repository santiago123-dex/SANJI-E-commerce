import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
    log: ["error"], // o puedes poner "query", "info", "warn" para depurar
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;