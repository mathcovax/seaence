export type NameKeyDate =
	| "lastCookNodeSameRawDocument"
	| "lastSendBakedDocument";

export interface MongoKeyDate {
	name: NameKeyDate;
	date: Date;
}
