import type { AnswerList } from "@/lib/horizon/types/answer";
import type { PostPage } from "@/lib/horizon/types/post";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

const defaultAnswerPage = 0;

export function usePostPage(
	postId: Ref<string>,
	language: Ref<BakedDocumentLanguage>,
	whenFindError: () => void,
) {
	const postPageInformation = ref<PostPage | null>(null);
	const answers = ref<AnswerList>([]);
	const answerPage = ref(defaultAnswerPage);

	function findAnswerList() {
		return horizonClient
			.post(
				"/answer-list",
				{
					body: {
						postId: postId.value,
						page: answerPage.value,
					},
				},
			)
			.whenInformation(
				"answerList.found",
				({ body }) => {
					answers.value.unshift(...body.reverse());
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	function findPostPage() {
		return horizonClient
			.post(
				"/post-page",
				{
					body: {
						postId: postId.value,
						language: language.value,
					},
				},
			)
			.whenInformation(
				"postPage.found",
				({ body }) => {
					postPageInformation.value = body;
					answerPage.value = defaultAnswerPage;
					answers.value = [];
					void findAnswerList();
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	function seeMoreAnswers() {
		if (!postPageInformation.value) {
			return;
		}

		answerPage.value++;
	}

	watch(
		[postId, language],
		() => {
			void findPostPage();
		},
		{ immediate: true },
	);

	watch(
		answerPage,
		() => {
			void findAnswerList();
		},
	);

	return {
		postPageInformation,
		answers,
		seeMoreAnswers,
	};
}
