import { SchoolAPI } from "@interfaces/providers/school";
import { useMustBeConnectedBuilder } from "../security/authentication";
import { match } from "ts-pattern";
import { answerConfig } from "@interfaces/configs/answer";
import { Answer } from "@business/entities/forum/answer";
import { Post } from "@business/entities/forum/post";

useMustBeConnectedBuilder({ unauthorizedBannedUser: true })
	.createRoute("POST", "/create-answer")
	.extract({
		body: {
			postId: Post.id,
			content: Answer.content,
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, content, user } = pickup(["postId", "content", "user"]);

			const schoolResponse = await SchoolAPI.replyToPost(
				postId,
				{
					content,
					authorId: user.id,
					authorName: user.username,
				},
			);

			return match(schoolResponse)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answer.created" },
					(_response) => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.handler(
		() => new CreatedHttpResponse(
			"answer.created",
		),
		makeResponseContract(CreatedHttpResponse, "answer.created"),
	);

useBuilder()
	.createRoute("POST", "/answer-list")
	.extract({
		body: {
			postId: Post.id,
			page: zod.number(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, page } = pickup(["postId", "page"]);

			const schoolResponse = await SchoolAPI.findAnswers(
				postId,
				answerConfig.findAnswers.quantityPerPage,
				page,
			);

			return match(schoolResponse)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answers.found" },
					(response) => dropper({ answers: response.body }),
				)
				.exhaustive();
		},
		["answers"],
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.cut(
		({ pickup, dropper }) => {
			const answers = pickup("answers");

			const processedAnswers = answers.map(
				(answer) => answer.status === "notCompliant"
					? {
						...answer,
						content: Answer.notCompliantContent,
					}
					: answer,
			);

			return dropper({ processedAnswers });
		},
		["processedAnswers"],
	)
	.handler(
		(pickup) => {
			const processedAnswers = pickup("processedAnswers");

			return new OkHttpResponse(
				"answerList.found",
				processedAnswers,
			);
		},
		makeResponseContract(OkHttpResponse, "answerList.found", Answer.index.array()),
	);
