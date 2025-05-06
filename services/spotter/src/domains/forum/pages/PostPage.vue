<script setup lang="ts">
import { horizonClient } from "@/lib/horizon";
import { usePostPage } from "../composables/usePostPage";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { params, query, $pt } = postPage.use();
const router = useRouter();
const { user, isConnected } = useUserInformation();

const { postPageInformation, answers, seeMoreAnswers } = usePostPage(
	computed(() => params.value.postId),
	computed(() => query.value.language),
	() => {
		router.back();
	},
);

const newAnswer = ref("");

function handleCreateAnswer() {
	if (!user.value || !newAnswer.value.trim()) {
		return;
	}

	const { id: userId, username } = user.value;

	void horizonClient
		.post(
			"/create-answer",
			{
				body: {
					postId: params.value.postId,
					content: newAnswer.value,
				},
			},
		)
		.whenInformation(
			"answer.created",
			() => {
				answers.value.push(
					{
						id: "temp",
						content: newAnswer.value,
						author: {
							id: userId,
							username,
						},
						postId: params.value.postId,
					},
				);
				newAnswer.value = "";
			},
		);
}

</script>

<template>
	<section
		class="flex flex-col gap-6"
		v-if="postPageInformation"
	>
		<DSButton
			as-child
			class="self-start"
		>
			<RouterLink
				:to="postListPage.createTo({
					params: {
						documentId: postPageInformation.document.id,
					},
				})"
			>
				{{ $pt("backToPostList") }}
			</RouterLink>
		</DSButton>

		<article class="border rounded-lg shadow-sm p-6 bg-white sticky top-0">
			<header class="mb-4 border-b pb-4">
				<h1 class="text-3xl font-semibold mb-2">
					{{ postPageInformation.post.topic }}
				</h1>

				<h2 class="text-3xl font-semibold mb-2">
					{{ postPageInformation.document.title }}
				</h2>

				<div class="flex items-center text-sm text-gray-500 gap-2">
					<span>{{ $pt("authorIs", {author: postPageInformation.post.author.username}) }}</span>

					<span>{{ postPageInformation.post.createdAt }}</span>
				</div>
			</header>

			<div class="text-gray-800 text-lg leading-relaxed">
				{{ postPageInformation.post.content ?? "" }}
			</div>
		</article>

		<div class="flex flex-col gap-6">
			<h2
				v-if="postPageInformation"
				class="text-2xl font-semibold mb-6"
			>
				{{ $pt("countResponse", {count: answers.length, totalCount: postPageInformation.post.answerCount}) }}
			</h2>

			<div
				v-if="answers && answers.length > 0"
				class="space-y-6"
			>
				<div
					v-if="answers.length < postPageInformation.post.answerCount"
					class="text-center mt-6"
				>
					<DSButton
						@click="seeMoreAnswers"
					>
						{{ $t("cta.seeMore") }}
					</DSButton>
				</div>

				<div
					v-for="answer in answers"
					:key="answer.id"
					class="border border-gray-200 rounded-lg p-5 bg-gray-50"
				>
					<p class="text-gray-800 mb-3">
						{{ answer.content }}
					</p>

					<div class="text-sm text-gray-500">
						{{ $pt("authorIs", {author: answer.author.username}) }}
					</div>
				</div>
			</div>

			<div
				v-else
				class="text-gray-500 italic mt-4"
			>
				{{ $pt("noResponse") }}
			</div>

			<div
				v-if="isConnected"
				class="border border-gray-200 rounded-lg p-5 bg-gray-50"
			>
				{{ $pt("writeAnAnswer") }}

				<textarea
					class="w-full mt-2 p-2 border rounded-lg"
					rows="4"
					placeholder="Écrivez votre réponse ici..."
					v-model="newAnswer"
				/>

				<DSButton
					class="mt-2"
					@click="handleCreateAnswer"
				>
					{{ $t("cta.send") }}
				</DSButton>
			</div>
		</div>
	</section>
</template>
