
import { envs } from "@interfaces/envs";
import { PrismaClient } from "@prisma/output";

export const prismaClient = new PrismaClient();

export interface PostReference {
	type: "post";
	postId: string;
}

export interface AnswerReference {
	type: "answer";
	postId: string;
	answerId: string;
}

declare global {
	namespace PrismaJson {
		type WarningReference =
			| PostReference
			| AnswerReference;
	}
}

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
