import { C, E, promiseObject } from "@duplojs/utils";
import { createReportPost } from "@domains/aggregates/post/createReportPost";
import { PostPort } from "@applications/ports/post";
import { ReportPort } from "@applications/ports/report";
import type { Post } from "@domains/entities/post";
import type { Report } from "@domains/entities/report";

interface Input {
	post: Post.Entity & Post.Unprocessed;
	level: Report.Level;
	reason: Report.Reason;
}

export const CreateReportPostUseCase = C.createUseCase(
	{
		PostPort,
		ReportPort,
	},
	({ postPort, reportPort }) => (input: Input) => E.rightAsyncPipe(
		createReportPost(input),
		({ post, report }) => promiseObject({
			report: reportPort.save(report),
			post: postPort.save(post),
		}),
		(result) => E.right("post.report", result),
	),
);
