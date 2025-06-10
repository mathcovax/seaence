<script setup lang="ts">
import { postPage } from "@/domains/post/postModeration/router";
import { ref, computed } from "vue";
import PostStats from "./components/PostStats.vue";
import PostContent from "./components/PostContent.vue";
import PostModerationActions from "./components/PostModeration.vue";

const { $pt } = postPage.use();

// Mock posts array
const mockPosts = ref([
	{
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
	},
	{
		id: "post-456",
		topic: "Problème avec l'exercice 3 du chapitre 2",
		content:
			"Je bloque sur l'exercice 3 du chapitre 2. La consigne demande de calculer la variance mais "
			+ "je ne comprends pas quelle formule utiliser. Est-ce qu'on doit utiliser la formule de la population "
			+ "ou celle de l'échantillon ? Les données fournies ne sont pas claires à ce sujet.",
		nodeSameRawDocumentId: "doc-789",
		answerCount: 1,
		author: {
			id: "user-456",
			username: "MathStudent2024",
		},
		createdAt: "2024-05-29T09:15:00Z",
	},
	{
		id: "post-789",
		topic: "Question sur la méthodologie de recherche",
		content:
			"Dans le cours sur la méthodologie de recherche, il est mentionné qu'il faut définir "
			+ "une hypothèse nulle et une hypothèse alternative. Pouvez-vous donner un exemple concret "
			+ "pour mieux comprendre la différence entre les deux ?",
		nodeSameRawDocumentId: "doc-123",
		answerCount: 0,
		author: {
			id: "user-123",
			username: "ChercheuseDébutante",
		},
		createdAt: "2024-05-29T08:45:00Z",
	},
]);

const firstIndex = 0;
const minPendingCount = 0;
const currentPostIndex = ref(firstIndex);
const isProcessing = ref(false);
const showRejectForm = ref(false);
const rejectReason = ref("");
const actionType = ref<"warning" | "block">("warning");
const stats = ref({
	pending: mockPosts.value.length,
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

const currentPost = computed(() => mockPosts.value[currentPostIndex.value] || null);

const hasPostsRemaining = computed(() => currentPostIndex.value < mockPosts.value.length);

function handleApprove() {
	const timeout = 1000;
	isProcessing.value = true;

	setTimeout(() => {
		console.log("Post approuvé:", currentPost.value?.id);
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
			postId: currentPost.value?.id,
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
	currentPostIndex.value++;
	stats.value.pending = Math.max(minPendingCount, mockPosts.value.length - currentPostIndex.value);
	console.log("Load next post, index:", currentPostIndex.value);
}
</script>

<template>
	<section class="min-h-screen-nh">
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
				class="mb-6"
			/>

			<PostContent
				v-if="hasPostsRemaining"
				:post="currentPost"
			>
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
		</div>
	</section>
</template>
