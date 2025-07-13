import { postRepository } from "@business/applications/repositories/post";
import { PostEntity, postIdObjecter } from "@business/domains/entities/post";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter, toSimpleObject } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

postRepository.default = {
	generatePostId() {
		return postIdObjecter.unsafeCreate(uuidv7());
	},
	async findOldestUnprocessedPost() {
		const unprocessedOldestMongoPost = await mongo.postCollection.findOne(
			{
				status: "unprocessed",
			},
			{
				sort: {
					createdAt: 1,
				},
			},
		);

		if (!unprocessedOldestMongoPost) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			PostEntity,
			{
				...unprocessedOldestMongoPost,
			},
		);
	},
	async findByNodeSameRawDocumentId(nodeSameRawDocumentId, { quantityPerPage, page }) {
		return mongo
			.postCollection
			.find({
				nodeSameRawDocumentId: nodeSameRawDocumentId.value,
				status: { $ne: "notCompliant" },
			})
			.sort(
				{
					answerCount: -1,
				},
			)
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.map(
				(mongoPost) => EntityHandler.unsafeMapper(
					PostEntity,
					{
						...mongoPost,
					},
				),
			)
			.toArray();
	},
	async getTotalCountOfUnprocessedPosts() {
		const mongoPostCount = await mongo.postCollection.countDocuments({
			status: "unprocessed",
		});

		return intObjecter.unsafeCreate(mongoPostCount);
	},
	async getTotalCountByNodeSameRawDocumentId(nodeSameRawDocumentId) {
		const mongoPostCount = await mongo.postCollection.countDocuments({
			nodeSameRawDocumentId: nodeSameRawDocumentId.value,
		});

		return intObjecter.unsafeCreate(mongoPostCount);
	},
	async findOneById(postId) {
		const mongoPost = await mongo.postCollection.findOne({
			id: postId.value,
		});

		if (!mongoPost) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			PostEntity,
			{
				...mongoPost,
			},
		);
	},
	async save(entity) {
		const simplePost = entity.toSimpleObject();

		await mongo.postCollection.updateOne(
			{
				id: simplePost.id,
			},
			{ $set: simplePost },
			{ upsert: true },
		);

		return entity;
	},
	async renameAuthor(userId, newName) {
		await mongo.postCollection.updateMany(
			{
				authorId: userId.value,
			},
			{
				$set: {
					authorName: toSimpleObject(newName),
				},
			},
		);
	},
};
