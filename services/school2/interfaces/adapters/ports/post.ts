import { PostPort } from "@applications/ports/post";
import { C, toNative, unwrap } from "@duplojs/utils";
import { Post } from "@domains/entities/post";
import { mongo } from "../../providers/mongo";
import { uuidv7 } from "uuidv7";

export const postPort = PostPort.createImplementation({
	generateId() {
		return C.appendEvidence(
			Post.Id.createOrThrow(uuidv7()),
			"generated",
		);
	},
	async getAnswerCount(entity) {
		const count = await mongo.answerCollection.countDocuments({
			postId: unwrap(entity.id),
		});

		return C.appendEvidence(
			C.PositiveInt.createOrThrow(count),
			"count",
		);
	},
	async save(entity) {
		const post = C.unwrapEntity(entity, { transformer: toNative });

		await mongo.postCollection.updateOne(
			{
				id: post.id,
			},
			{
				$set: {
					id: post.id,
					topic: post.topic,
					content: post.content,
					nodeSameRawDocumentId: post.nodeSameRawDocumentId,
					authorId: post.authorId,
					authorName: post.authorName,
					answerCount: post.answerCount,
					status: post.status,
					createdAt: post.createdAt,
				},
			},
			{ upsert: true },
		);

		return entity;
	},
	async findOneById(id) {
		const post = await mongo.postCollection.findOne({
			id: unwrap(id),
		});

		if (!post) {
			return C.none("Post");
		}

		return C.some(
			Post.computeStatus(
				Post.Entity.mapOrThrow(post),
			),
		);
	},
	async findOldestUnprocessed() {
		const post = await mongo.postCollection.findOne(
			{
				status: "unprocessed",
			},
			{
				sort: {
					createdAt: 1,
				},
			},
		);

		if (!post) {
			return C.none("Post");
		}

		const entity = Post.computeStatus(
			Post.Entity.mapOrThrow(post),
		);

		if (!Post.Unprocessed.has(entity)) {
			throw new Error("oldest-unprocessed-post-status-mismatch");
		}

		return C.some(
			entity,
		);
	},
	findManyByNodeSameRawDocument(params) {
		const nodeSameRawDocumentId = unwrap(params.nodeSameRawDocumentId);
		const page = unwrap(params.page);
		const quantityPerPage = unwrap(params.quantityPerPage);

		return mongo.postCollection
			.find({
				nodeSameRawDocumentId,
				status: { $ne: "notCompliant" },
			})
			.sort({ answerCount: -1 })
			.skip(page * quantityPerPage)
			.limit(quantityPerPage)
			.map((post) => Post.computeStatus(Post.Entity.mapOrThrow(post)))
			.toArray();
	},
	async getTotalCountByNodeSameRawDocument(nodeSameRawDocumentId) {
		const count = await mongo.postCollection.countDocuments({
			nodeSameRawDocumentId: unwrap(nodeSameRawDocumentId),
		});

		return C.PositiveInt.createOrThrow(count);
	},
	async getTotalCountOfUnprocessed() {
		const count = await mongo.postCollection.countDocuments({
			status: "unprocessed",
		});

		return C.PositiveInt.createOrThrow(count);
	},
});
