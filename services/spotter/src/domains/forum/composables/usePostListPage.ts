import { horizonClient } from "@/lib/horizon";
import type { PostList, PostListPage } from "@/lib/horizon/types/post";

export function usePostListPage(
	documentId: Ref<string>,
	whenFindError: () => void,
) {
	const postListPageInforamtion = ref<PostListPage | null>(null);
	const postList = ref<PostList | null>(null);

	const defaultPageOfPostList = 1;
	const pageOfPostList = ref(defaultPageOfPostList);

	function findPostList() {
		return horizonClient
			.post(
				"/post-list",
				{
					body: {
						documentId: documentId.value,
						page: pageOfPostList.value,
					},
				},
			)
			.whenInformation(
				"postList.found",
				(response) => {
					postList.value = response.body;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	function findPostListPage() {
		return horizonClient
			.post(
				"/post-list-page",
				{
					body: {
						documentId: documentId.value,
					},
				},
			)
			.whenInformation(
				"postListPage.found",
				(response) => {
					postListPageInforamtion.value = response.body;
					void findPostList();
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	function setPageOfPostList(page: number) {
		pageOfPostList.value = page;
	}

	watch(
		documentId,
		() => {
			void findPostListPage();
		},
		{ immediate: true },
	);

	watch(
		pageOfPostList,
		findPostList,
	);

	return {
		postListPageInforamtion,
		postList,
		pageOfPostList,
		setPageOfPostList,
	};
}
