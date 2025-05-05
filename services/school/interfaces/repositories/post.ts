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
	async save(post) {
		const mongoPost = post.toSimpleObject();

		await mongo.postCollection.updateOne(
			{
				id: mongoPost.id,
			},
			{ $set: mongoPost },
			{ upsert: true },
		);

		return post;
	},
};
