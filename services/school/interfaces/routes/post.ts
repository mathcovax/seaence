import { CreatePostUsecase } from "@business/applications/usecases/createPost";
import { GetAnswersFromPostUsecase } from "@business/applications/usecases/getAnswersFromPost";
import { ReplyToPostUsecase } from "@business/applications/usecases/replyToPost";
import { answerContentObjecter } from "@business/domains/entities/answer";
import { articleIdObjecter } from "@business/domains/entities/article";
import { creatorObjecter, postContentObjecter, postIdObjecter, postTopicObjecter } from "@business/domains/entities/post";
import { UserEntity, userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { iWantPostExistById } from "@interfaces/checkers/post";

useBuilder()
	.createRoute("POST", "/posts")
	.extract({
		body: zod.object(
			{
				topic: postTopicObjecter.toZodSchema(),
				content: postContentObjecter.toZodSchema(),
				articleId: articleIdObjecter.toZodSchema(),
				creator: zod.object({
					userId: userIdObjecter.toZodSchema(),
					username: usernameObjecter.toZodSchema(),
				}).transform(
					(creator) => creatorObjecter.unsafeCreate(UserEntity.create(creator)),
				),
			},
		),
	})
	.handler(
		async(pickup) => {
			const usecase = new CreatePostUsecase();
			const { topic, content, articleId, creator } = pickup("body");

			const createdPost = await usecase.execute({
				topic,
				content,
				articleId,
				creator,
			});

			return new CreatedHttpResponse(
				"post.created",
				createdPost,
			);
		},
	);

useBuilder()
	.createRoute("POST", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		body: zod.object(
			{
				content: answerContentObjecter.toZodSchema(),
				responderId: userIdObjecter.toZodSchema(),
			},
		),
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		async(pickup) => {
			const post = pickup("post");

			const usecase = new ReplyToPostUsecase();
			const { content, responderId } = pickup("body");

			const repliedAnswer = await usecase.execute({
				postId: post.postId,
				content,
				responderId,
			});

			return new CreatedHttpResponse(
				"answer.created",
				repliedAnswer,
			);
		},
	);

useBuilder()
	.createRoute("GET", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		async(pickup) => {
			const postId = pickup("postId");

			const usecase = new GetAnswersFromPostUsecase();
			const answers = await usecase.execute({
				postId: postId,
			});

			return new OkHttpResponse(
				"answers.found",
				answers,
			);
		},
	);
