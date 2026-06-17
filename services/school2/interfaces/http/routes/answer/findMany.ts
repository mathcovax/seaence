import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, C, DPE, pipeCall } from "@duplojs/utils";
import { answerPort } from "@adapters/ports";
import { Answer } from "@domains/entities/answer";
import { Post } from "@domains/entities/post";
import { iWantPostExistsById } from "@http/checkers";

useRouteBuilder("POST", "/find-many-answer-by-post")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
			page: C.PositiveInt.toExtractParser(),
			quantityPerPage: C.StrictPositiveInt.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantPostExistsById,
		({ body }) => body.postId,
	)
	.handler(
		ResponseContract.ok("answers.found", Answer.Entity.toEndpointSchema().array()),
		({ body }, { response }) => answerPort
			.findManyByPost(body)
			.then(
				A.map(pipeCall(C.unwrapEntity)),
			)
			.then(
				(answers) => response("answers.found", answers),
			),
	);
