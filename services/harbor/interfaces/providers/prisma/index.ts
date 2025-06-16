
import { envs } from "@interfaces/envs";
import { PrismaClient } from "@prisma/output";

export const prismaClient = new PrismaClient();

export interface PostReference {
	type: "post";
	postId: string;
}

declare global {
	namespace PrismaJson {
		type WarningReference = | PostReference;
	}
}

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
