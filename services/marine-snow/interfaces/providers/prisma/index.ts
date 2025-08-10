
import { type ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { envs } from "@interfaces/envs";
import { PrismaClient } from "@prisma/output";
import { type EntityToSimpleObject } from "@vendors/clean";

export const prismaClient = new PrismaClient();

declare global {
	namespace PrismaJson {
		type ExportManyArticleReferenceMissionFailedArticleReference
			= EntityToSimpleObject<typeof ArticleReferenceEntity>[] | null;
	}
}

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
