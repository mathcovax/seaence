import { envs } from "@interfaces/envs";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
