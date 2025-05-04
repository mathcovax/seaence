import { horizonClient } from "@/lib/horizon";
import type { PostList } from "@/lib/horizon/types/post";

export function useGetPosts(documentId: string) {
	const postsList = ref<PostList>();
	const { enableLoader, disableLoader } = useLoader();

	async function getPosts(page: number) {
		const loaderId = enableLoader();

		await horizonClient.get(
			"/documents/{documentId}/posts",
			{
				params: {
					documentId,
				},
				query: {
					page: page.toString(),
				},
			},
		).whenInformation(
			"posts.found",
			(response) => {
				postsList.value = response.body;
			},
		).finally(
			() => void disableLoader(loaderId),
		);
	}

	return {
		postsList,
		getPosts,
	};
}
