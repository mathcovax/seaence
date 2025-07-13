import { type Collection, type Db, MongoClient } from "mongodb";
import { extractIdFromMongoUrl } from "./extractIdFromMongoUrl";
import { UpdateUserMessageColletion } from "./collections/updateUser";
import { getTypedEntries } from "@duplojs/utils";
import { CreateUserMessageColletion } from "./collections/createUser";
import { CreateAnswerMessageCollection } from "./collections/createAnswer";
import { DeleteUserMessageCollection } from "./collections/deleteUser";
import { RestoreUserMessageCollection } from "./collections/restoreUser";

export interface AsyncMessageParams {
	mongoUrl: string;
	currentServiceName: string;
}

export interface AsyncMessageCollection {
	updateUser: UpdateUserMessageColletion;
	createUser: CreateUserMessageColletion;
	createAnswer: CreateAnswerMessageCollection;
	deleteUser: DeleteUserMessageCollection;
	restoreUser: RestoreUserMessageCollection;
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
			updateUser: new UpdateUserMessageColletion(this),
			createUser: new CreateUserMessageColletion(this),
			createAnswer: new CreateAnswerMessageCollection(this),
			deleteUser: new DeleteUserMessageCollection(this),
			restoreUser: new RestoreUserMessageCollection(this),
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
