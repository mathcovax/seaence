/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ToSimpleObject, type EntityClass, type GetEntityProperties } from "@vendors/clean";
import { MongoClient, type ObjectId } from "mongodb";
interface MongoBaseProps {
	_id?: ObjectId;
	createdAt?: Date;
	updatedAt: Date;
}

interface DynamicProps {
	[key: string]: any;
}

type MongoEntityType<
	GenericEntity extends EntityClass<any, any, any>,
> = ToSimpleObject<GetEntityProperties<GenericEntity> & MongoBaseProps & DynamicProps>;

async function createMongoClient(uri: string, dbName: string) {
	const client = new MongoClient(uri);
	await client.connect();
	return client.db(dbName);
}

export {
	createMongoClient,
	type MongoEntityType,
	type MongoBaseProps,
	type DynamicProps,
};
