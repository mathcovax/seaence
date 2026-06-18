import { createHttpClient } from "@duplojs/http/client";
import type { Routes } from "@vendors/clients-type/school/duplojsTypesCodegen2";
import { envs } from "@interfaces/envs";

export namespace SchoolProvider {
	const client = createHttpClient<Routes>({
		baseUrl: envs.SCHOOL_BASE_URL,
	});

	export function findManyPost(
		params: {
			nodeSameRawDocumentId: string;
			page: number;
			quantityPerPage: number;
		},
	) {
		return client.post(
			"/find-many-post-by-node-same-raw-document",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"posts.found": true,
			"extract-error": false,
		});
	}

	export function findManyPostDetails(
		params: {
			nodeSameRawDocumentId: string;
		},
	) {
		return client.post(
			"/find-many-post-by-node-same-raw-document-details",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"posts.foundDetails": true,
			"extract-error": false,
		});
	}

	export function createPost(
		params: {
			topic: string;
			content: string;
			nodeSameRawDocumentId: string;
			authorId: string;
			authorName: string;
		},
	) {
		return client.post(
			"/create-post",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"post.created": true,
			"extract-error": false,
		});
	}

	export function findManyAnswer(
		params: {
			postId: string;
			page: number;
			quantityPerPage: number;
		},
	) {
		return client.post(
			"/find-many-answer-by-post",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"post.notfound": true,
			"answers.found": true,
			"extract-error": false,
		});
	}

	export function replyToPost(
		params: {
			postId: string;
			content: string;
			authorId: string;
			authorName: string;
		},
	) {
		return client.post(
			"/reply-to-post",
			{
				body: params,
			},
		// big difference
		).iSelectExpectedResponseByInformationOrThrow({
			"answer.created": true,
			"post.notfound": true,
			"post.wrongStatus": false,
			"extract-error": false,
			"replyToPost.failed": false,
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
		)
			.iSelectExpectedResponseByInformationOrThrow({
				"post.found": true,
				"post.notfound": true,
				"extract-error": false,
			});
	}
}
