import { type MybePromise } from "@duplojs/utils";
import { type ChangeStream, type Collection, type CollectionOptions } from "mongodb";
import { type AsyncMessage } from "./asyncMessage";

export interface MessageCollectionParams {
	name: string;
	expireIn: number;
	options?: CollectionOptions;
}

export interface Message<
	GenericMessageValue extends unknown = unknown,
> {
	service: string;
	value: GenericMessageValue;
	createdAt: Date;
}

export type MessageCollectionCallBack<
	GenericMessageValue extends unknown = unknown,
> = (
	message: Message<GenericMessageValue>
) => MybePromise<void>;

export class MessageCollection<
	GenericMessageValue extends unknown,
> {
	public collection: Collection<Message<GenericMessageValue>>;

	public watcher: ChangeStream<Message<GenericMessageValue>> | null = null;

	public listeners: MessageCollectionCallBack<GenericMessageValue>[] = [];

	public constructor(
		private asyncMessage: AsyncMessage,
		public params: MessageCollectionParams,
	) {
		this.collection = asyncMessage.database.collection(
			params.name,
			params.options,
		);
	}

	public emit(value: GenericMessageValue) {
		return this.collection.insertOne({
			service: this.asyncMessage.params.currentServiceName,
			value,
			createdAt: new Date(),
		});
	}

	public on(callback: MessageCollectionCallBack<GenericMessageValue>) {
		this.listeners.push(callback);

		return () => void this.removeListener(callback);
	}

	public removeListener(callback: MessageCollectionCallBack<GenericMessageValue>) {
		this.listeners = this.listeners.filter((listener) => listener !== callback);
	}

	public async start(reconciliation = false) {
		if (this.watcher) {
			return;
		}

		const startAfter = reconciliation
			? await this.asyncMessage.resumeCollection
				.findOne(
					{
						service: this.asyncMessage.params.currentServiceName,
						messageCollection: this.params.name,
					},
				)
				.then(
					(resume) => resume?.token
						? JSON.parse(resume.token)
						: undefined,
				)
			: undefined;

		const watcher = this.collection.watch(
			[{ $match: { operationType: "insert" } }],
			{
				fullDocument: "updateLookup",
				startAfter,
			},
		);

		watcher.on(
			"change",
			async(change) => {
				if (change.operationType !== "insert") {
					return;
				}
				const { fullDocument } = change;

				await Promise.all(
					this.listeners.map(
						(listener) => listener(fullDocument),
					),
				);

				if (reconciliation) {
					await this.asyncMessage.resumeCollection.updateOne(
						{
							service: this.asyncMessage.params.currentServiceName,
							messageCollection: this.params.name,
						},
						{
							$set: {
								service: this.asyncMessage.params.currentServiceName,
								messageCollection: this.params.name,
								token: JSON.stringify(change._id),
							},
						},
						{ upsert: true },
					);
				}
			},
		);

		this.watcher = watcher;
	}

	public applyIndex() {
		return this.collection.createIndex(
			{ createdAt: 1 },
			{ expireAfterSeconds: this.params.expireIn },
		);
	}
}
