import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, asyncPipe, C, DPE, E } from "@duplojs/utils";
import { Answer } from "@domains/entities/answer";
import { Post } from "@domains/entities/post";
import { iWantPostExistsById, iWantPostWithAvailableStatus } from "@http/checkers";
import { useCases } from "@adapters/useCases";

useRouteBuilder("POST", "/find-many-available-answer-by-available-post")
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
	.presetCheck(
		iWantPostWithAvailableStatus,
		(floor) => floor.post,
	)
	.handler(
		ResponseContract.ok("answers.found", Answer.Entity.toEndpointSchema().array()),
		({ body, post }, { response }) => asyncPipe(
			useCases.findManyAvailableAnswerByAvailablePost({
				post,
				page: body.page,
				quantityPerPage: body.quantityPerPage,
			}),
			E.unwrapSelectionOrThrow({
				"find-many-available-answer-by-available-post-success": true,
			}),
			A.map((answer) => C.unwrapEntity(answer)),
			(answers) => response("answers.found", answers),
		),
	);
