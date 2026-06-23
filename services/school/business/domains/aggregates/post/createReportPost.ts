import { Post } from "@domains/entities/post";
import { Report } from "@domains/entities/report";

interface CreateReportPostParams {
	post: Post.Entity & Post.Unprocessed;
	level: Report.Level;
	reason: Report.Reason;
}

const notCompliantPostStatus = Post.Status.createOrThrow("notCompliant");

export function createReportPost(params: CreateReportPostParams) {
	return {
		report: Report.Entity.new({
			postId: params.post.id,
			answerId: null,
			userId: params.post.authorId,
			level: params.level,
			reason: params.reason,
		}),
		post: Post.Entity.update(
			params.post,
			{ status: notCompliantPostStatus },
		),
	};
}

