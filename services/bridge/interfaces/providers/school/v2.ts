import { createHttpClient } from "@duplojs/http/client";
import type { Routes } from "@vendors/clients-type/school/duplojsTypesCodegen2";
import { envs } from "@interfaces/envs";

export namespace SchoolProvider {
	const client = createHttpClient<Routes>({
		baseUrl: envs.SCHOOL_BASE_URL,
	});

	export function findOldestUnprocessedPost() {
		return client.post(
			"/find-oldest-unprocessed-post",
		).iSelectExpectedResponseByInformationOrThrow({
			"oldestUnprocessedPost.found": true,
			"oldestUnprocessedPost.notfound": true,
		});
	}

	export function getUnprocessedPostDetails() {
		return client.post(
			"/find-unprocessed-post-details",
		).iSelectExpectedResponseByInformationOrThrow({
			"unprocessedPost.details": true,
		});
	}

	export function markPostAsCompliant(
		params: {
			postId: string;
		},
	) {
		return client.post(
			"/mark-post-as-compliant",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"extract-error": false,
			"post.markAsCompliant": true,
			"post.notfound": true,
			"post.wrongStatus": true,
		});
	}

	export function createReportPost(
		params: {
			postId: string;
			level: "ban" | "warning";
			reason: string;
		},
	) {
		return client.post(
			"/create-report-post",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"extract-error": false,
			"post.notfound": true,
			"post.wrongStatus": true,
			"report.created": true,
		});
	}

	export function findOnePost(
		params: {
			postId: string;
		},
	) {
		return client.post(
			"/find-one-post",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"extract-error": false,
			"post.found": true,
			"post.notfound": true,
		});
	}

	export function findOldestUnprocessedAnswer() {
		return client.post(
			"/find-oldest-unprocessed-answer",
		).iSelectExpectedResponseByInformationOrThrow({
			"oldestUnprocessedAnswer.found": true,
			"oldestUnprocessedAnswer.notfound": true,
		});
	}

	export function getUnprocessedAnswerDetails() {
		return client.post(
			"/find-unprocessed-answer-details",
		).iSelectExpectedResponseByInformationOrThrow({
			"unprocessedAnswer.details": true,
		});
	}

	export function markAnswerAsCompliant(
		params: {
			answerId: string;
		},
	) {
		return client.post(
			"/mark-answer-as-compliant",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"answer.markedAsCompliant": true,
			"answer.notfound": true,
			"answer.wrongStatus": true,
			"extract-error": false,
		});
	}

	export function createReportAnswer(
		params: {
			answerId: string;
			level: "ban" | "warning";
			reason: string;
		},
	) {
		return client.post(
			"/create-report-answer",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"answer.notfound": true,
			"answer.wrongStatus": true,
			"extract-error": false,
			"report.created": true,
		});
	}
}
