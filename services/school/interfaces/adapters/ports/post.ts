import { PostPort } from "@applications/ports/post";
import { C, E, forwardAsserts, innerPipe, pipe, toNative, unwrap } from "@duplojs/utils";
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

		return C.some(Post.Entity.mapOrThrow(post));
	},
	async findOneAvailableById(id) {
		const post = await mongo.postCollection.findOne({
			id: unwrap(id),
			status: { $in: ["compliant", "unprocessed"] },
		});

		if (!post) {
			return C.appendEvidence(C.none("Post"), "one-available");
		}

		return pipe(
			post,
			Post.Entity.mapOrThrow(
				innerPipe(
					Post.computeStatus,
					E.whenHasInformationOtherwise(
						["post.unprocessed", "post.compliant"],
						E.success,
						(result) => E.left("post.wrongStatus", result),
					),
				),
			),
			C.some,
			C.appendEvidence("one-available"),
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
			return C.appendEvidence(C.none("Post"), "oldest-unprocessed");
		}

		return pipe(
			post,
			Post.Entity.mapOrThrow(
				innerPipe(
					Post.computeStatus,
					E.whenHasInformationOtherwise(
						"post.unprocessed",
						E.success,
						(result) => E.left("post.wrongStatus", result),
					),
				),
			),
			C.some,
			C.appendEvidence("oldest-unprocessed"),
		);
	},
	async findManyAvailableByNodeSameRawDocument(params) {
		const nodeSameRawDocumentId = unwrap(params.nodeSameRawDocumentId);
		const page = unwrap(params.page);
		const quantityPerPage = unwrap(params.quantityPerPage);

		return mongo.postCollection
			.find({
				nodeSameRawDocumentId,
				status: { $in: ["compliant", "unprocessed"] },
			})
			.sort({ answerCount: -1 })
			.skip(page * quantityPerPage)
			.limit(quantityPerPage)
			.map(
				Post.Entity.mapOrThrow(
					innerPipe(
						Post.computeStatus,
						E.whenHasInformationOtherwise(
							["post.unprocessed", "post.compliant"],
							E.success,
							(result) => E.left("post.wrongStatus", result),
						),
					),
				),
			)
			.toArray()
			.then(C.appendEvidence("many-available"));
	},
	async getTotalCountAvailableByNodeSameRawDocument(nodeSameRawDocumentId) {
		const count = await mongo.postCollection.countDocuments({
			nodeSameRawDocumentId: unwrap(nodeSameRawDocumentId),
			status: { $in: ["compliant", "unprocessed"] },
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
