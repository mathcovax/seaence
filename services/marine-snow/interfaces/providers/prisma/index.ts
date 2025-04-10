/* eslint-disable @typescript-eslint/no-namespace */
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { envs } from "@interfaces/envs";
import { PrismaClient } from "@prisma/output";
import { type EntityToSimpleObject } from "@vendors/clean";

export const prismaClient = new PrismaClient();

declare global {
	namespace PrismaJson {
		type FaildedSearchResults = EntityToSimpleObject<typeof SearchResultEntity>[];
	}
}

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
