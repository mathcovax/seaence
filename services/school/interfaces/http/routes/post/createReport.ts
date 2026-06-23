import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, DPE, E } from "@duplojs/utils";
import { useCases } from "@adapters/useCases";
import { Post } from "@domains/entities/post";
import { Report } from "@domains/entities/report";
import { iWantPostExistsById, iWantPostWithUnprocessedStatus } from "@http/checkers";

useRouteBuilder("POST", "/create-report-post")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
			level: Report.Level.toExtractParser(),
			reason: Report.Reason.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantPostExistsById,
		(floor) => floor.body.postId,
	)
	.presetCheck(
		iWantPostWithUnprocessedStatus,
		(floor) => floor.post,
	)
	.handler(
		ResponseContract.created("report.created"),
		({ body, post }, { response }) => asyncPipe(
			useCases.createReportPostUseCase({
				post,
				level: body.level,
				reason: body.reason,
			}),
			E.unwrapSelectionOrThrow({
				"post.report": true,
			}),
			() => response("report.created"),
		),
	);
