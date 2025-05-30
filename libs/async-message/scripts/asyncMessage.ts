import { type Collection, type Db, MongoClient } from "mongodb";
import { extractIdFromMongoUrl } from "./extractIdFromMongoUrl";
import { RenameUserMessageColletion } from "./collections/renameUser";
import { getTypedEntries } from "@duplojs/utils";
import { RenameDocumentMessageColletion } from "./collections/renameDocument";

export interface AsyncMessageParams {
	mongoUrl: string;
	currentServiceName: string;
}

export interface AsyncMessageCollection {
	renameUser: RenameUserMessageColletion;
	renameDocument: RenameDocumentMessageColletion;
}

export interface Resume {
	service: string;
	messageCollection: string;
	token: string;
}

export class AsyncMessage {
	public client: MongoClient;

	public database: Db;

	public resumeCollection: Collection<Resume>;

	public collections: AsyncMessageCollection;

	public constructor(
		public params: AsyncMessageParams,
	) {
		this.client = new MongoClient(params.mongoUrl);
		const { database } = extractIdFromMongoUrl(params.mongoUrl);
		this.database = this.client.db(database);
		this.resumeCollection = this.database.collection("resume");

		this.collections = {
			renameDocument: new RenameDocumentMessageColletion(this),
			renameUser: new RenameUserMessageColletion(this),
		};
	}

	public connect() {
		return this.client.connect()
			.then(
				() => void Promise.all(
					getTypedEntries(this.collections)
						.map(
							([_key, value]) => value.applyIndex(),
						),
				),
			);
	}
}
