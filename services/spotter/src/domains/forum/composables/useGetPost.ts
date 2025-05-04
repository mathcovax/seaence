import { horizonClient } from "@/lib/horizon";
import type { Language, Post } from "@/lib/horizon/types/post";

export function useGetPost(postId: string, language: Language) {
	const post = ref<Post | null>(null);
	const { enableLoader, disableLoader } = useLoader();

	async function getPost() {
		const loaderId = enableLoader();

		await horizonClient.get(
			"/posts/{postId}",
			{
				params: {
					postId,
				},
				query: {
					language,
				},
			},
		).whenInformation(
			"post.found",
			(response) => {
				post.value = response.body;
			},
		).finally(
			() => void disableLoader(loaderId),
		);
	}

	return {
		post,
		getPost,
	};
}
