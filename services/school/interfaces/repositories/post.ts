import { postRepository } from "@business/applications/repositories/post";
import { articleIdObjecter } from "@business/domains/entities/article";
import { creatorObjecter, postContentObjecter, PostEntity, postIdObjecter, postTopicObjecter } from "@business/domains/entities/post";
import { UserEntity, userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { uuidv7 } from "uuidv7";

postRepository.default = {
	generatePostId() {
		return postIdObjecter.unsafeCreate(uuidv7());
	},
	async findByArticleId(articleId) {
		const mongoPosts = mongo.postCollection.find({
			articleId: articleId.value,
		});

		return mongoPosts.map(
			(mongoPost) => PostEntity.create({
				postId: postIdObjecter.unsafeCreate(mongoPost.postId),
				topic: postTopicObjecter.unsafeCreate(mongoPost.topic),
				content: postContentObjecter.unsafeCreate(mongoPost.content),
				articleId: articleIdObjecter.unsafeCreate(mongoPost.articleId),
				creator: creatorObjecter.unsafeCreate(
					UserEntity.create({
						userId: userIdObjecter.unsafeCreate(mongoPost.creator.userId),
						username: usernameObjecter.unsafeCreate(mongoPost.creator.username),
					}),
				),
			}),
		).toArray();
	},
	async findOneById(postId) {
		const mongoPost = await mongo.postCollection.findOne({
			postId: postId.value,
		});

		if (!mongoPost) {
			return null;
		}

		const creatorObjecterEntity = creatorObjecter.unsafeCreate(
			UserEntity.create({
				userId: userIdObjecter.unsafeCreate(mongoPost.creator.userId),
				username: usernameObjecter.unsafeCreate(mongoPost.creator.username),
			}),
		);

		return PostEntity.create({
			postId: postIdObjecter.unsafeCreate(mongoPost.postId),
			topic: postTopicObjecter.unsafeCreate(mongoPost.topic),
			content: postContentObjecter.unsafeCreate(mongoPost.content),
			articleId: articleIdObjecter.unsafeCreate(mongoPost.articleId),
			creator: creatorObjecterEntity,
		});
	},
	async save(post) {
		const postCreatorValue = post.creator.value;

		await mongo.postCollection.insertOne({
			postId: post.postId.value,
			topic: post.topic.value,
			content: post.content.value,
			articleId: post.articleId.value,
			creator: {
				userId: postCreatorValue.userId.value,
				username: postCreatorValue.username.value,
			},
		});

		return post;
	},
};
