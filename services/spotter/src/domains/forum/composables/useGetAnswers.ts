import { horizonClient } from "@/lib/horizon";
import type { Answer } from "@/lib/horizon/types/answer";

export function useGetAnswers(postId: string) {
	const answers = ref<Answer[]>([]);
	const { enableLoader, disableLoader } = useLoader();

	async function getAnswers(page: number) {
		const loaderId = enableLoader();

		await horizonClient.get(
			"/posts/{postId}/answers",
			{
				params: {
					postId,
				},
				query: {
					page: page.toString(),
				},
			},
		).whenInformation(
			"answers.found",
			(response) => {
				answers.value = response.body;
			},
		).finally(
			() => void disableLoader(loaderId),
		);
	}

	return {
		answers,
		getAnswers,
	};
}
