<script setup lang="ts">
import { postPage } from "@/domains/post/postModeration/router";
import { ref } from "vue";
import PostStats from "./components/PostStats.vue";
import PostContent from "./components/PostContent.vue";
import PostModerationActions from "./components/PostModeration.vue";
import { usePostModerationPage } from "./composables/usePostModerationPage";

const { $pt } = postPage.use();

const {
	postModerationPage,
	findOldestUnprocessedPost,
} = usePostModerationPage();

const {
	sonnerMessage,
} = useSonner();

const isProcessing = ref(false);
const showRejectForm = ref(false);
const rejectReason = ref("");
const actionType = ref<"warning" | "block">("warning");
const rejectReasons = [
	$pt("rejectModal.reason.choices.spam"),
	$pt("rejectModal.reason.choices.inappropriate"),
	$pt("rejectModal.reason.choices.offTopic"),
	$pt("rejectModal.reason.choices.duplicate"),
	$pt("rejectModal.reason.choices.lowQuality"),
	$pt("rejectModal.reason.choices.other"),
];

function handleApprove() {
	const timeout = 1000;
	isProcessing.value = true;

	setTimeout(async() => {
		if (!postModerationPage.value) {
			return;
		}

		await bridgeClient
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
					sonnerMessage("Post approuvé avec succès !");
					loadNextPost();
				},
			);
		isProcessing.value = false;
	}, timeout);
}

function handleReject() {
	showRejectForm.value = true;
}

function confirmReject() {
	if (!rejectReason.value) {
		return;
	}

	const timeout = 1000;
	isProcessing.value = true;

	setTimeout(async() => {
		if (!postModerationPage.value) {
			return;
		}

		await bridgeClient
			.post(
				"/posts/{postId}/is-not-compliant-and-create-warning",
				{
					params: {
						postId: postModerationPage.value.post.id,
					},
					body: {
						reason: rejectReason.value,
						makeUserBan: actionType.value === "block",
					},
				},
			)
			.whenInformation(
				"post.updated",
				() => {
					rejectReason.value = "";
					actionType.value = "warning";
					showRejectForm.value = false;
					isProcessing.value = false;

					loadNextPost();

					sonnerMessage("Post rejeté avec succès !");
				},
			);
	}, timeout);
}

function cancelReject() {
	showRejectForm.value = false;
	rejectReason.value = "";
	actionType.value = "warning";
}

function loadNextPost() {
	void findOldestUnprocessedPost();
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

			<PostContent
				:post="postModerationPage.post"
			>
				<PostModerationActions
					:is-processing="isProcessing"
					:reject-reasons="rejectReasons"
					:show-reject-form="showRejectForm"
					:reject-reason="rejectReason"
					:action-type="actionType"
					@approve="handleApprove"
					@reject="handleReject"
					@confirm-reject="confirmReject"
					@cancel-reject="cancelReject"
					@update:reject-reason="rejectReason = $event"
					@update:action-type="actionType = $event"
				/>
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
