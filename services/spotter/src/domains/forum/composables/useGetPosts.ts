import { horizonClient } from "@/lib/horizon";
import type { PostsPayload } from "@/lib/horizon/types/post";

export function useGetPosts(documentId: string) {
	const postsPayload = ref<PostsPayload>();
	const { enableLoader, disableLoader } = useLoader();
	const router = useRouter();

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
				postsPayload.value = response.body;
			},
		)
			.whenInformation(
				"document.notfound",
				() => void router.back(),
			)
			.finally(
				() => void disableLoader(loaderId),
			);
	}

	return {
		postsPayload,
		getPosts,
	};
}
