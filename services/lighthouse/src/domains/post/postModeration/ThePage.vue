<script setup lang="ts">
import { postPage } from "@/domains/post/postModeration/router";
import { ref } from "vue";
import PostStats from "./components/PostStats.vue";
import PostContent from "./components/PostContent.vue";
import PostModerationActions from "./components/PostModeration.vue";

const { $pt } = postPage.use();

// Mock post
const mockPost = ref({
	id: "post-123",
	topic: "Comment interpréter les données du graphique page 5 ?",
	content:
        "Bonjour, je suis en train d'étudier le document sur les statistiques et je n'arrive pas à comprendre "
        + "l'interprétation du graphique en page 5. Pouvez-vous m'expliquer ce que représentent les barres bleues "
        + "par rapport aux barres rouges ? J'ai essayé de lire la légende mais ce n'est pas très clair pour moi. "
        + "Merci d'avance pour votre aide !",
	nodeSameRawDocumentId: "doc-456",
	answerCount: 3,
	author: {
		id: "user-789",
		username: "EtudiantCurieux",
	},
	createdAt: "2024-05-29T10:30:00Z",
});

const isProcessing = ref(false);
const showRejectForm = ref(false);
const rejectReason = ref("");
const actionType = ref<"warning" | "block">("warning");
const stats = ref({
	pending: 12,
	approved: 142,
	rejected: 8,
});
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

	setTimeout(() => {
		console.log("Post approuvé:", mockPost.value.id);
		loadNextPost();
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

	setTimeout(() => {
		console.log("Post rejeté:", {
			postId: mockPost.value.id,
			reason: rejectReason.value,
			actionType: actionType.value,
		});

		showRejectForm.value = false;
		rejectReason.value = "";
		actionType.value = "warning";

		loadNextPost();
		isProcessing.value = false;
	}, timeout);
}

function cancelReject() {
	showRejectForm.value = false;
	rejectReason.value = "";
	actionType.value = "warning";
}

function loadNextPost() {
	console.log("Chargement du post suivant...");
}
</script>

<template>
	<section class="min-h-screen-nh p-6">
		<div class="max-w-4xl mx-auto">
			<header class="mb-8">
				<h1 class="mb-2 text-3xl font-bold">
					{{ $pt("title") }}
				</h1>

				<p>
					{{ $pt("description") }}
				</p>
			</header>

			<PostStats
				:pending-count="stats.pending"
				:approved-count="stats.approved"
				:rejected-count="stats.rejected"
				class="mb-6"
			/>

			<PostContent :post="mockPost">
				<PostModerationActions
					:is-processing="isProcessing"
					:show-reject-form="showRejectForm"
					:reject-reason="rejectReason"
					:action-type="actionType"
					:reject-reasons="rejectReasons"
					@approve="handleApprove"
					@reject="handleReject"
					@confirm-reject="confirmReject"
					@cancel-reject="cancelReject"
					@update:reject-reason="rejectReason = $event"
					@update:action-type="actionType = $event"
				/>
			</PostContent>
		</div>
	</section>
</template>
