<script setup lang="ts">
import { horizonClient } from "@/lib/horizon";
import { usePostPage } from "../composables/usePostPage";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { getRelativeTime } from "@vendors/design-system/lib/utils";
import PostAnswer from "../components/PostAnswer.vue";
import BellButton from "@/domains/notification/components/BellButton.vue";

const { params, $pt } = postPage.use();
const router = useRouter();
const { user, userNavigatorLanguage } = useUserInformation();
const sonner = useSonner();
const { t } = useI18n();
const replyPostNotificationIsEnable = ref(false);

const { postPageInformation, answers, seeMoreAnswers } = usePostPage(
	computed(() => params.value.postId),
	computed(() => userNavigatorLanguage.value),
	() => {
		router.back();
	},
);

const newAnswer = ref("");

const minLength = 5;
const maxLength = 500;
const answerSchema
	= zod.string()
		.trim()
		.min(minLength, { message: t("formMessage.minLength", { value: minLength }) })
		.max(maxLength, { message: t("formMessage.maxLength", { value: maxLength }) });

const errorMessage = ref("");

function handleCreateAnswer() {
	if (!user.value) {
		sonner.sonnerError($pt("connexionRequire"));
		return;
	}

	const result = answerSchema.safeParse(newAnswer.value);

	if (!result.success) {
		const error = result.error.errors.pop();
		errorMessage.value = error?.message ?? "";
		return;
	}

	errorMessage.value = "";

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
						authorName: username,
						authorId: userId,
						postId: params.value.postId,
						createdAt: new Date().toJSON(),
					},
				);

				if (postPageInformation.value?.post) {
					postPageInformation.value.post.answerCount++;
				}

				newAnswer.value = "";
			},
		);
}

function handleReplyPostNotification() {
	if (!user.value) {
		sonner.sonnerError($pt("connexionRequire"));
		replyPostNotificationIsEnable.value = !replyPostNotificationIsEnable.value;
		return;
	}
	const postId = postPageInformation.value?.post.id;

	if (!postId) {
		return;
	}

	void horizonClient
		.post(
			"/toggle-post-notification",
			{
				body: {
					postId,
					enable: replyPostNotificationIsEnable.value,
				},
			},
		)
		.catch(() => {
			replyPostNotificationIsEnable.value = !replyPostNotificationIsEnable.value;
		});
}

watch(
	() => postPageInformation.value?.notificationOfPostIsActivate,
	() => {
		replyPostNotificationIsEnable.value = !!postPageInformation.value?.notificationOfPostIsActivate;
	},
);

</script>

<template>
	<section v-if="postPageInformation">
		<article class="stick z-5 mb-4 p-6 bg-background rounded-lg rounded-b-lg shadow-md">
			<header class="border-b pb-4">
				<div class="mb-6 flex justify-between items-center">
					<div class="flex gap-4 items-start">
						<DSOutlineButton
							square
							class="shrink-0"
							:aria-label="$pt('backToDocument')"
							@click="router.back()"
						>
							<DSIcon name="arrowLeft" />
						</DSOutlineButton>

						<h1 class="text-3xl font-semibold text-blue-seaence">
							{{ postPageInformation.post.topic }}
						</h1>
					</div>

					<BellButton
						v-model="replyPostNotificationIsEnable"
						@click="handleReplyPostNotification"
					/>
				</div>

				<RouterLink :to="documentPage.createTo({ params: { id: postPageInformation.document.id } })">
					<h2 class="text-xl font-medium mb-4 text-blue-seaence hover:underline">
						{{ postPageInformation.document.title }}
					</h2>
				</RouterLink>

				<div class="flex flex-wrap items-center text-sm gap-4">
					<div class="flex items-center gap-2 text-muted-foreground">
						<DSIcon
							name="account"
							size="small"
						/>

						<span>{{ $pt("authorIs", { author: postPageInformation.post.authorName }) }}</span>
					</div>

					<div class="flex items-center gap-2 text-muted-foreground">
						<DSIcon
							name="calendar"
							size="small"
						/>

						<span>{{ getRelativeTime(postPageInformation.post.createdAt) }}</span>
					</div>
				</div>
			</header>

			<div class="text-gray-800 text-lg leading-relaxed whitespace-pre-line w-full text-ellipsis overflow-hidden">
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

				<DSOutlineButton
					v-if="answers.length > 0 && answers.length < postPageInformation.post.answerCount"
					@click="seeMoreAnswers"
				>
					{{ $t("cta.seeMore") }}
				</DSOutlineButton>
			</div>

			<div
				v-if="answers && answers.length > 0"
				class="space-y-6"
			>
				<PostAnswer
					v-for="answer in answers"
					:key="answer.id"
					:answer="answer"
				/>
			</div>

			<div
				v-else
				class="text-muted-foreground italic my-8 text-center"
			>
				{{ $pt("noResponse") }}
			</div>

			<DSCard
				:title="$pt('writeAnAnswer')"
				:description="$pt('writeAnAnswerDescription')"
				class="mt-6 flex flex-col gap-4"
			>
				<DSTextarea
					class="h-40 resize-none focus:border-blue-seaence focus:ring-2 focus:outline-none"
					:placeholder="$pt('writeYourAnswer')"
					v-model="newAnswer"
				/>

				<DSHintError :message="errorMessage" />

				<template #footer>
					<DSPrimaryButton
						class="self-start"
						:disabled="!newAnswer.trim()"
						@click="handleCreateAnswer"
					>
						<DSIcon name="send" />
						{{ $t("cta.send") }}
					</DSPrimaryButton>
				</template>
			</DSCard>
		</div>
	</section>
</template>
