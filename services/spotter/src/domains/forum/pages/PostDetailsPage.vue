<script setup lang="ts">
import { useGetAnswers } from "../composables/useGetAnswers";
import { useGetPost } from "../composables/useGetPost";

const { params } = postDetailsPage.use();

const {
	post,
	getPost,
} = useGetPost(params.value.id);

const {
	answers,
	getAnswers,
} = useGetAnswers(params.value.id);

const startPage = 1;
const currentPage = ref(startPage);

onMounted(
	async() => {
		await getPost();
		await getAnswers(currentPage.value);
	},
);

</script>

<template>
	<section class="flex flex-col gap-4">
		<div>
			<h1>
				{{ post?.topic }}
			</h1>

			<span>
				Créée le {{ post?.createdAt }} par {{ post?.author.username }}
			</span>
		</div>

		<div>
			<h2>({{ answers.length }}) Réponses :</h2>

			<div
				v-if="answers && answers.length > 0"
			>
				<div
					v-for="answer in answers"
					:key="answer.id"
				>
					<article class="border border-gray-300 p-4 mb-4">
						<p class="text-gray-700">
							{{ answer.content }}
						</p>

						<p class="text-sm text-gray-500">
							Posté par {{ answer.author.username }}
						</p>
					</article>
				</div>
			</div>

			<div
				v-else
				class="text-gray-500"
			>
				Aucune réponse(s) pour ce post.
			</div>
		</div>
	</section>
</template>
