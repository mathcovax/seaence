import { horizonClient } from "@/lib/horizon";
import type { PostList } from "@/lib/horizon/types/post";

export function useGetPosts(articleId: string) {
	const postsList = ref<PostList>();
	const { enableLoader, disableLoader } = useLoader();

	async function getPosts(page: number) {
		const loaderId = enableLoader();

		await horizonClient.get(
			"/articles/{articleId}/posts",
			{
				params: {
					articleId,
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
		);

		disableLoader(loaderId);
	}

	return {
		postsList,
		getPosts,
	};
}
