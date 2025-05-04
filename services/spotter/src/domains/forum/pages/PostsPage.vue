<script setup lang="ts">
import { useGetPosts } from "../composables/useGetPosts";

const { params } = postsPage.use();

const {
	postsPayload,
	getPosts,
} = useGetPosts(params.value.documentId);

const startPage = 0;
const currentPage = ref(startPage);

watch(
	() => params.value.documentId,
	async() => {
		await getPosts(startPage);
	},
	{ immediate: true },
);

async function handlePageChange() {
	currentPage.value++;
	await getPosts(currentPage.value);
	window.scrollTo({ top: 0 });
}
</script>

<template>
	<section class="max-w-5xl mx-auto px-4 py-8">
		<div
			class="flex flex-col gap-6"
		>
			<h1 class="text-3xl font-semibold mb-2">
				Post(s) lié au document : {{ postsPayload?.document.title }}
			</h1>

			<div v-if="postsPayload?.postList && postsPayload.postList.posts.length > 0">
				<div class="space-y-6">
					<div
						v-for="post in postsPayload.postList.posts"
						:key="post.id"
					>
						<article class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
							<RouterLink
								:to="{
									name: postDetailsPage.name,
									params: {
										postId: post.id,
									}
								}"
								class="text-2xl font-semibold text-blue-seaence mb-2"
							>
								{{ post.topic }}
							</RouterLink>

							<p class="text-gray-700 mb-4">
								{{ post.content }}
							</p>

							<div class="flex flex-wrap items-center text-sm text-gray-500 gap-4">
								<span>Posté par <span class="font-medium text-gray-600">{{ post.author.username }}</span></span>

								<span>•</span>

								<span>{{ post.createdAt }}</span>

								<span>•</span>

								<span>{{ post.answerCount }} réponse(s)</span>
							</div>
						</article>
					</div>
				</div>

				<div class="mt-10 flex justify-center">
					<DSPagination
						:total="postsPayload.postList.totalCount"
						:current-page="currentPage"
						:quantity-per-page="postsPayload.postList.quantityPerPage"
						@update="handlePageChange"
						:key="'top-pagination-' + currentPage"
					/>
				</div>
			</div>

			<div
				v-else
				class="text-center text-gray-500 mt-10"
			>
				<p class="italic">
					Aucun post(s) trouvé pour ce document.
				</p>
			</div>
		</div>
	</section>
</template>
