<script setup lang="ts">
import { horizonClient } from "@/lib/horizon";
import { useGetAnswers } from "../composables/useGetAnswers";
import { useGetPost } from "../composables/useGetPost";

const { params } = postDetailsPage.use();
const router = useRouter();
const { sonnerMessage } = useSonner();

const {
	post,
	getPost,
} = useGetPost(
	params.value.postId,
);

const {
	answers,
	getAnswers,
} = useGetAnswers(params.value.postId);

const startPage = 0;
const currentPage = ref(startPage);
const newAnswer = ref("");

async function handleLoadMore() {
	currentPage.value++;
	await getAnswers(currentPage.value);
}

async function handleCreatePost() {
	await horizonClient.post(
		"/posts/{postId}/answers",
		{
			params: {
				postId: params.value.postId,
			},
			body: {
				content: newAnswer.value,
			},
		},
	).whenInformation(
		"answer.created",
		() => {
			sonnerMessage("Commentaire envoyé avec succès !");
			answers.value.push(
				{
					id: "zizi",
					content: newAnswer.value,
					author: {
						id: "null",
						username: "null",
					},
					postId: params.value.postId,
				},
			);
			newAnswer.value = "";
		},
	);
}

watch(
	() => params.value.postId,
	async() => {
		await getPost();
		if (post.value) {
			await getAnswers(startPage);
		} else {
			router.back();
		}
	},
	{ immediate: true },
);

</script>

<template>
	<section
		class="flex flex-col gap-6"
	>
		<DSButton
			as-child
			class="self-start"
		>
			<RouterLink
				:to="postsPage.createTo({
					params: {
						documentId: params.documentId,
					},
				})"
			>
				Retour à la liste des posts
			</RouterLink>
		</DSButton>

		<article class="border rounded-lg shadow-sm p-6 bg-white">
			<header class="mb-4 border-b pb-4">
				<h1 class="text-3xl font-semibold mb-2">
					{{ post?.topic }}
				</h1>

				<div class="flex items-center text-sm text-gray-500 gap-2">
					<span>Posté par {{ post?.author.username }}</span>

					<span>•</span>

					<span>{{ post?.createdAt }}</span>
				</div>
			</header>

			<div class="text-gray-800 text-lg leading-relaxed">
				{{ post?.content }}
			</div>
		</article>

		<div class="flex flex-col gap-6">
			<h2
				v-if="post"
				class="text-2xl font-semibold mb-6"
			>
				{{ answers.length + " / " + post.answerCount }} Réponse(s)
			</h2>

			<div
				v-if="answers && answers.length > 0"
				class="space-y-6"
			>
				<div
					v-if="post && answers.length < post?.answerCount"
					class="text-center mt-6"
				>
					<DSButton
						@click="handleLoadMore"
					>
						Charger plus
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
						Posté par {{ answer.author.username }}
					</div>
				</div>
			</div>

			<div
				v-else
				class="text-gray-500 italic mt-4"
			>
				Aucune réponse(s) pour ce post.
			</div>

			<div
				class="border border-gray-200 rounded-lg p-5 bg-gray-50"
			>
				Écrivez un commentaire
				<textarea
					class="w-full mt-2 p-2 border rounded-lg"
					rows="4"
					placeholder="Écrivez votre réponse ici..."
					v-model="newAnswer"
				/>

				<DSButton
					class="mt-2"
					@click="handleCreatePost"
				>
					Envoyer
				</DSButton>
			</div>
		</div>
	</section>
</template>
