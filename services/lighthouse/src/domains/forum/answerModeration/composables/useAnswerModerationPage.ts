import type { AnswerModerationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";

export function useAnswerModerationPage() {
	const answerModerationPage = ref<AnswerModerationPage | null>(null);

	function findOldestUnprocessedAnswer() {
		return bridgeClient
			.post(
				"/answer-moderation-page",
			)
			.whenInformation(
				"answerModerationPage.found",
				({ body }) => {
					answerModerationPage.value = body;
				},
			)
			.whenRequestError(
				() => {
					answerModerationPage.value = null;
				},
			);
	}

	void findOldestUnprocessedAnswer();

	return {
		answerModerationPage,
		findOldestUnprocessedAnswer,
	};
}
