import { SchoolAPI } from "@interfaces/providers/school";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";
import { match } from "ts-pattern";
import { endpointAnswerSchema } from "../schemas/answer";

useMustBeConnectedBuilder()
	.createRoute("POST", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: zod.string(),
		},
		body: {
			content: zod.string(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, content, user } = pickup(["postId", "content", "user"]);

			const schoolResponse = await SchoolAPI.replyToPost({
				postId,
				content,
				author: {
					id: user.id,
					username: user.username,
				},
			});

			return match(schoolResponse)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answer.created" },
					(response) => dropper({ answer: response.body }),
				)
				.exhaustive();
		},
		["answer"],
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.handler(
		(pickup) => {
			const answer = pickup("answer");

			return new CreatedHttpResponse(
				"answer.created",
				answer,
			);
		},
		makeResponseContract(CreatedHttpResponse, "answer.created", endpointAnswerSchema),
	);

useMustBeConnectedBuilder()
	.createRoute("GET", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: zod.string(),
		},
		query: {
			page: zod.coerce.number(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, page } = pickup(["postId", "page"]);

			const schoolResponse = await SchoolAPI.getAnswers(
				postId,
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
	.handler(
		(pickup) => {
			const answers = pickup("answers");

			return new OkHttpResponse(
				"answers.found",
				answers,
			);
		},
		makeResponseContract(OkHttpResponse, "answers.found", endpointAnswerSchema.array()),
	);
