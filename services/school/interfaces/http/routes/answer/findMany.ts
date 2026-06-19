import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, C, DPE, E, innerPipe, O, pipeCall } from "@duplojs/utils";
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
		({ body, post }, { response }) => useCases
			.findManyAvailableAnswerByAvailablePost({
				post,
				page: body.page,
				quantityPerPage: body.quantityPerPage,
			})
			.then(
				E.whenHasInformation(
					"find-many-available-answer-by-available-post-success",
					innerPipe(
						O.getProperty("answers"),
						A.map(pipeCall(C.unwrapEntity)),
					),
				),
			)
			.then(
				(answers) => response("answers.found", answers),
			),
	);
