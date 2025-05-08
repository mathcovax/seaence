<script setup lang="ts">
import { horizonClient } from "@/lib/horizon";
import { usePostPage } from "../composables/usePostPage";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { getRelativeTime } from "@vendors/design-system/lib/utils";

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
						createdAt: new Date().toISOString(),
					},
				);
				newAnswer.value = "";
			},
		);
}

</script>

<template>
	<section v-if="postPageInformation">
		<article class="sticky top-24 z-5 mb-4 p-6 bg-white rounded-lg rounded-b-lg shadow-md">
			<header class="border-b pb-4">
				<div class="mb-6 flex gap-4 items-center">
					<DSButtonIcon
						as-child
					>
						<RouterLink
							:to="postListPage.createTo({
								params: {
									documentId: postPageInformation.document.id,
								},
							})"
						>
							<DSIcon name="arrowLeft" />
						</RouterLink>
					</DSButtonIcon>

					<h1 class="text-3xl font-semibold text-blue-seaence">
						{{ postPageInformation.post.topic }}
					</h1>
				</div>

				<h2 class="text-xl font-medium mb-4 text-gray-700">
					{{ postPageInformation.document.title }}
				</h2>

				<div class="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
					<div class="flex items-center gap-2">
						<DSIcon
							name="account"
							size="14"
						/>

						<span>{{ $pt("authorIs", { author: postPageInformation.post.author.username }) }}</span>
					</div>

					<div class="flex items-center gap-2">
						<DSIcon
							name="calendar"
							size="14"
						/>

						<span>{{ getRelativeTime(postPageInformation.post.createdAt) }}</span>
					</div>
				</div>
			</header>

			<div class="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
				{{ postPageInformation.post.content ?? "" }}
			</div>
		</article>

		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<h2
					v-if="postPageInformation"
					class="text-2xl font-semibold"
				>
					{{ $pt("countResponse", { count: answers.length, totalCount: postPageInformation.post.answerCount }) }}
				</h2>

				<DSButtonOutline
					v-if="answers.length > 0 && answers.length < postPageInformation.post.answerCount"
					@click="seeMoreAnswers"
				>
					{{ $pt("olderResponse") }}
				</DSButtonOutline>
			</div>

			<div
				v-if="answers && answers.length > 0"
				class="space-y-6"
			>
				<DSCard
					v-for="answer in answers"
					:key="answer.id"
					class="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-sm transition-shadow"
				>
					<p class="text-gray-800 mb-4 whitespace-pre-line">
						{{ answer.content }}
					</p>

					<div class="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
						<div class="flex items-center gap-2">
							<DSIcon
								name="account"
								size="14"
							/>

							<span>{{ $pt("authorIs", { author: answer.author.username }) }}</span>
						</div>

						<div class="flex items-center gap-2">
							<DSIcon
								name="calendar"
								size="14"
							/>

							<span>{{ getRelativeTime(answer.createdAt) }}</span>
						</div>
					</div>
				</DSCard>
			</div>

			<div
				v-else
				class="text-muted-foreground italic my-8 text-center"
			>
				{{ $pt("noResponse") }}
			</div>

			<DSCard
				v-if="isConnected"
				class="border border-gray-200 rounded-lg p-6 bg-white mt-6"
			>
				<h3 class="text-lg font-medium mb-4">
					{{ $pt("writeAnAnswer") }}
				</h3>

				<DSTextarea
					class="h-40 resize-none focus:border-blue-seaence focus:ring-2 focus:outline-none"
					:placeholder="$t('cta.writeYourAnswer')"
					v-model="newAnswer"
				/>

				<DSButtonPrimary
					class="mt-4"
					@click="handleCreateAnswer"
					:disabled="!newAnswer.trim()"
				>
					<DSIcon
						name="send"
					/>
					{{ $t("cta.send") }}
				</DSButtonPrimary>
			</DSCard>
		</div>
	</section>
</template>
