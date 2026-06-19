import { pipe } from "@duplojs/utils";
import { Post } from "@domains/entities/post";
import { Report } from "@domains/entities/report";

interface CreateReportPostParams {
	post: Post.Entity & Post.Unprocessed;
	level: Report.Level;
	reason: Report.Reason;
}

const notCompliantPostStatus = Post.Status.createOrThrow("notCompliant");

export function createReportPost(params: CreateReportPostParams) {
	const report = Report.Entity.new({
		postId: params.post.id,
		answerId: null,
		userId: params.post.authorId,
		level: params.level,
		reason: params.reason,
	});

	const updatedPost = pipe(
		params.post,
		Post.Entity.update({ status: notCompliantPostStatus }),
		Post.NotCompliant.append,
	);

	return {
		report,
		post: updatedPost,
	};
}

