import { z } from "zod";

const mongoIdSchema = z.object({
	user: z.string().optional(),
	password: z.string().optional(),
	host: z.string(),
	port: z.coerce.number(),
	database: z.string(),
});

export function extractIdFromMongoUrl(mongoUrl: string) {
	const { groups } = /^mongodb:\/\/(:?(?<user>[^:]*):(?<password>[^@]*)@)?(?<host>[^:]*):(?<port>[^/]*)\/(?<database>[^?]*)\??/.exec(mongoUrl) ?? {};

	return mongoIdSchema.parse(groups);
}
