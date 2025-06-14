import { postRepository } from "@business/applications/repositories/post";
import { PostEntity, postIdObjecter } from "@business/domains/entities/post";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";
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
				author: EntityHandler.unsafeMapper(
					UserEntity,
					unprocessedOldestMongoPost.author,
				),
			},
		);
	},
	async findByNodeSameRawDocumentId(nodeSameRawDocumentId, { quantityPerPage, page }) {
		const mongoPosts = mongo.postCollection.find({
			nodeSameRawDocumentId: nodeSameRawDocumentId.value,
		});

		return mongoPosts
			.sort(
				{
					answerCount: -1,
				},
			)
			.filter({ status: { $ne: "notCompliant" } })
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.map(
				(mongoPost) => EntityHandler.unsafeMapper(
					PostEntity,
					{
						...mongoPost,
						author: EntityHandler.unsafeMapper(
							UserEntity,
							mongoPost.author,
						),
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
				author: EntityHandler.unsafeMapper(
					UserEntity,
					mongoPost.author,
				),
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
	async *findByAuthorId(userId) {
		const startPage = 0;
		const quantityPerPage = 10;

		for (let page = startPage; true; page++) {
			const posts = await mongo.postCollection.find(
				{ "author.id": userId.value },
			)
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.map(
					(mongoPost) => EntityHandler.unsafeMapper(
						PostEntity,
						{
							...mongoPost,
							author: EntityHandler.unsafeMapper(
								UserEntity,
								mongoPost.author,
							),
						},
					),
				)
				.toArray();

			if (!posts.length) {
				break;
			}

			for (const post of posts) {
				yield post;
			}
		}
	},
};
