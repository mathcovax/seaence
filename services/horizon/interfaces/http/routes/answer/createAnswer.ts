
import { P } from "@duplojs/utils";
import { Answer } from "@business/entities/forum/answer";
import { Post } from "@business/entities/forum/post";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { SchoolProvider } from "@interfaces/providers/school";

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

			const result = await SchoolProvider.replyToPost(
				{
					postId,
					content,
					authorId: user.id,
					authorName: user.username,
				},
			);

			return P.match(result)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answer.created" },
					() => dropper(null),
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
