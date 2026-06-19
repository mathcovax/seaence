import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { DPE } from "@duplojs/utils";
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
		({ body, post }, { response }) => useCases
			.createReportPostUseCase({
				post,
				level: body.level,
				reason: body.reason,
			})
			.then(
				() => response("report.created"),
			),
	);
