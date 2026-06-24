import { createHttpClient } from "@duplojs/http/client";
import type { Routes } from "@vendors/clients-type/school/duplojsTypesCodegen";
import { envs } from "@interfaces/envs";

export namespace SchoolProvider {
	const client = createHttpClient<Routes>({
		baseUrl: envs.SCHOOL_BASE_URL,
	});

	export function findManyAvailablePost(
		params: {
			nodeSameRawDocumentId: string;
			page: number;
			quantityPerPage: number;
		},
	) {
		return client.post(
			"/find-many-available-post-by-node-same-raw-document",
			{
				body: params,
			},
		).iSelectExpectedResponseByInformationOrThrow({
			"posts.found": true,
			"extract-error": false,
		});
	}

	export function findManyAvailablePostDetails(
		params: {
			nodeSameRawDocumentId: string;
		},
	) {
		return client.post(
			"/find-many-available-post-by-node-same-raw-document-details",
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

	export function findManyAvailableAnswer(
		params: {
			postId: string;
			page: number;
			quantityPerPage: number;
		},
	) {
		return client.post(
			"/find-many-available-answer-by-available-post",
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

	export function findOneAvailablePost(
		params: {
			postId: string;
		},
	) {
		return client.post(
			"/find-one-available-post",
			{
				body: params,
			},
		)
			.iSelectExpectedResponseByInformationOrThrow({
				"availablePost.found": true,
				"availablePost.notfound": true,
				"extract-error": false,
			});
	}
}
