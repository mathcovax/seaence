import { DPE } from "@duplojs/utils";

const mongoIdSchema = DPE.object({
	user: DPE.string().optional(),
	password: DPE.string().optional(),
	host: DPE.string(),
	port: DPE.coerce.number(),
	database: DPE.string(),
});

export function extractIdFromMongoUrl(mongoUrl: string) {
	const { groups } = /^mongodb:\/\/(:?(?<user>[^:]*):(?<password>[^@]*)@)?(?<host>[^:]*):(?<port>[^/]*)\/(?<database>[^?]*)\??/.exec(mongoUrl) ?? {};

	return mongoIdSchema.parseOrThrow(groups);
}
