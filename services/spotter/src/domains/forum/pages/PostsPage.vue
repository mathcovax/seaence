<script setup lang="ts">
import { useGetPosts } from "../composables/useGetPosts";

const { params } = postsPage.use();

const {
	postsList,
	getPosts,
} = useGetPosts(params.value.documentId);

const startPage = 1;
const currentPage = ref(startPage);

watch(
	() => params.value.documentId,
	async() => {
		await getPosts(currentPage.value);
	},
	{ immediate: true },
);
function handlePageChange(page: number) {
	currentPage.value = page;
	window.scrollTo({ top: 0 });
}
</script>

<template>
	<section>
		<h1>
			Liste des posts de l'article {{ params.documentId }}
		</h1>

		<div
			v-if="postsList?.posts && postsList.posts.length > 0"
		>
			<div
				v-for="post in postsList?.posts"
				:key="post.id"
			>
				<article class="border border-gray-300 p-4 mb-4">
					<h2 class="text-xl font-bold">
						{{ post.topic }}
					</h2>

					<p class="text-gray-700">
						{{ post.content }}
					</p>

					<p class="text-sm text-gray-500">
						Posté par {{ post.author.username }} le {{ post.createdAt }}
					</p>

					<p class="text-sm text-gray-500">
						Nombre de réponse(s) : {{ post.answerCount }}
					</p>
				</article>
			</div>

			<DSPagination
				:total="postsList.totalCount"
				:current-page="currentPage"
				:quantity-per-page="postsList.quantityPerPage"
				@update="handlePageChange"
				:key="'top-pagination-' + currentPage"
			/>
		</div>

		<div
			v-else
			class="text-center"
		>
			<p class="text-gray-500">
				Aucun post trouvé(s) pour ce document.
			</p>
		</div>
	</section>
</template>
