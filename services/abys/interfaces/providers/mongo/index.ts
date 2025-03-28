import { MongoClient, type Db, type Collection } from "mongodb";

class MongoDBProvider {
	private client: MongoClient | null = null;

	private db: Db | null = null;

	public constructor(
		private readonly uri: string,
		private readonly dbName: string,
	) {}

	public async connect(): Promise<void> {
		if (this.client) {
			return;
		}

		this.client = new MongoClient(this.uri);
		await this.client.connect();
		this.db = this.client.db(this.dbName);
	}

	public async disconnect(): Promise<void> {
		if (!this.client) {
			return;
		}

		await this.client.close();
		this.client = null;
		this.db = null;
	}

	public getCollection(collectionName: string): Collection {
		if (!this.db) {
			throw new Error("Non connecté à MongoDB. Appelez connect() d'abord.");
		}
		return this.db.collection(collectionName);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async upsert(collectionName: string, filter: object, document: any) {
		const collection = this.getCollection(collectionName);
		const result = await collection.updateOne(
			filter,
			{ $set: document },
			{ upsert: true },
		);
		return result;
	}

	public async findMany(collectionName: string, filter: object = {}, options: object = {}) {
		const collection = this.getCollection(collectionName);
		return collection.find(filter, options).toArray();
	}

	public async findOne(collectionName: string, filter: object, options: object = {}) {
		const collection = this.getCollection(collectionName);
		return collection.findOne(filter, options);
	}
}

export async function createMongoDBClient(uri: string, dbName: string) {
	const mongoDBProvider = new MongoDBProvider(uri, dbName);
	await mongoDBProvider.connect();
	return mongoDBProvider;
}
