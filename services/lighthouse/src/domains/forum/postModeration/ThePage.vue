<script setup lang="ts">
import { postPage } from "./router";
import PostStats from "./components/PostStats.vue";
import PostContent from "./components/PostContent.vue";
import { usePostModerationPage } from "./composables/usePostModerationPage";
import { usePostModerationForm } from "./composables/usePostModerationForm";

const { $pt } = postPage.use();

const {
	postModerationPage,
	findOldestUnprocessedPost,
} = usePostModerationPage();
const {
	PostModerationForm,
	passeToApproveForm,
	passeToRejectForm,
	formMode,
	checkForm,
	resetForm,
} = usePostModerationForm();

function handleApprove() {
	if (!postModerationPage.value) {
		return;
	}

	void bridgeClient
		.post(
			"/posts/{postId}/is-compliant",
			{
				params: {
					postId: postModerationPage.value.post.id,
				},
			},
		)
		.whenInformation(
			"post.updated",
			() => {
				resetForm();
				void findOldestUnprocessedPost();
			},
		);
}

function confirmReject() {
	const result = checkForm();

	if (!result || result.type !== "reject" || !postModerationPage.value) {
		return;
	}

	void bridgeClient
		.post(
			"/posts/{postId}/is-not-compliant-and-create-warning",
			{
				params: {
					postId: postModerationPage.value.post.id,
				},
				body: {
					reason: result.value.reason,
					makeUserBan: result.value.makeUserBan,
				},
			},
		)
		.whenInformation(
			"post.updated",
			() => {
				resetForm();
				void findOldestUnprocessedPost();
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
			v-if="postModerationPage"
		>
			<PostStats
				:pending-count="postModerationPage.unprocessedTotalCount"
				class="mb-6"
			/>

			<PostContent :post="postModerationPage.post">
				<PostModerationForm class="w-full">
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
							@click="passeToRejectForm"
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
							{{ $pt("rejectModal.confirm") }}
						</DSDestructiveButton>

						<DSOutlineButton @click="passeToApproveForm">
							{{ $t("cta.cancel") }}
						</DSOutlineButton>
					</template>
				</PostModerationForm>
			</PostContent>
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
