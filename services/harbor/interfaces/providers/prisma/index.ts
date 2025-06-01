/* eslint-disable @typescript-eslint/no-namespace */
import { envs } from "@interfaces/envs";
import { PrismaClient } from "@prisma/output";

export const prismaClient = new PrismaClient();

interface PostWarning {
	type: "post";
	postId: string;
}
declare global {
	namespace PrismaJson {
		type WarningValue = | PostWarning;
	}
}

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
