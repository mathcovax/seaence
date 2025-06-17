import type { PostModerationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";

export function usePostModerationPage() {
	const postModerationPage = ref<PostModerationPage | null>(null);

	function findOldestUnprocessedPost() {
		return bridgeClient
			.post(
				"/post-moderation-page",
			)
			.whenInformation(
				"postModerationPage.found",
				({ body }) => {
					postModerationPage.value = body;
				},
			)
			.whenRequestError(
				() => {
					postModerationPage.value = null;
				},
			);
	}

	void findOldestUnprocessedPost();

	return {
		postModerationPage,
		findOldestUnprocessedPost,
	};
}
