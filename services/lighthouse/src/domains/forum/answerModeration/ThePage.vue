<script setup lang="ts">
import AnswerContent from "./components/AnswerContent.vue";
import { useAnswerModerationForm } from "./composables/useAnswerModerationForm";
import { useAnswerModerationPage } from "./composables/useAnswerModerationPage";
import { answerPage } from "./router";

const { $pt } = answerPage.use();

const {
	answerModerationPage,
	findOldestUnprocessedAnswer,
} = useAnswerModerationPage();
const {
	AnswerModerationForm,
	switchToApproveForm,
	switchToRejectForm,
	formMode,
	checkForm,
	resetForm,
} = useAnswerModerationForm();

function handleApprove() {
	if (!answerModerationPage.value) {
		return;
	}

	void bridgeClient
		.post(
			"/answers/{answerId}/is-compliant",
			{
				params: {
					answerId: answerModerationPage.value.answer.id,
				},
			},
		)
		.whenInformation(
			"answer.updated",
			() => {
				resetForm();
				void findOldestUnprocessedAnswer();
			},
		);
}

function confirmReject() {
	const result = checkForm();

	if (!result || result.type !== "reject" || !answerModerationPage.value) {
		return;
	}

	void bridgeClient
		.post(
			"/answers/{answerId}/is-not-compliant-and-create-warning",
			{
				params: {
					answerId: answerModerationPage.value.answer.id,
				},
				body: {
					reason: result.value.reason,
					makeUserBan: result.value.makeUserBan,
				},
			},
		)
		.whenInformation(
			"answer.updated",
			() => {
				resetForm();
				void findOldestUnprocessedAnswer();
			},
		);
}
</script>

<template>
	<section class="min-h-screen-nh">
		<header class="mb-8">
			<h1 class="mb-2 text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("description") }}
			</p>
		</header>

		<div
			v-if="answerModerationPage"
		>
			<AnswerStats
				:pending-count="answerModerationPage.unprocessedTotalCount"
				class="mb-6"
			/>

			<AnswerContent :answer="answerModerationPage.answer">
				<AnswerModerationForm class="w-full">
					<template v-if="formMode === 'approve'">
						<DSPrimaryButton
							icon="check"
							class="mr-4"
							@click="handleApprove"
						>
							{{ $t("cta.approuve") }}
						</DSPrimaryButton>

						<DSDestructiveButton
							icon="close"
							@click="switchToRejectForm"
						>
							{{ $t("cta.reject") }}
						</DSDestructiveButton>
					</template>

					<template v-else>
						<DSDestructiveButton
							@click="confirmReject"
							icon="send"
							class="mr-4"
						>
							{{ $pt("warningModal.confirm") }}
						</DSDestructiveButton>

						<DSOutlineButton @click="switchToApproveForm">
							{{ $t("cta.cancel") }}
						</DSOutlineButton>
					</template>
				</AnswerModerationForm>
			</AnswerContent>
		</div>

		<div
			v-else
			class="text-center py-12"
		>
			<div class="mb-4">
				<DSIcon
					name="check"
					class="mx-auto text-green-seaence"
					size="large"
				/>
			</div>

			<h2 class="mb-2 text-xl font-semibold">
				{{ $pt("emptyTitle") }}
			</h2>

			<p class="text-muted-foreground">
				{{ $pt("emptyDescription") }}
			</p>
		</div>
	</section>
</template>
