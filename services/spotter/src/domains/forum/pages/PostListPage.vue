<script setup lang="ts">
import { usePostListPage } from "../composables/usePostListPage";
import PostRow from "../components/PostRow.vue";

const { params, $pt } = postListPage.use();
const router = useRouter();
const { scrollToTop } = useScroll();
const {
	postList,
	postListPageInforamtion,
	pageOfPostList,
	setPageOfPostList,
} = usePostListPage(
	computed(() => params.value.documentId),
	() => {
		router.back();
	},
);

watch(
	pageOfPostList,
	() => {
		scrollToTop("instant");
	},
);
</script>

<template>
	<section class="max-w-5xl mx-auto px-4 py-8">
		<div
			v-if="postListPageInforamtion"
			class="flex flex-col gap-6"
		>
			<div class="mb-6 flex gap-4 items-center">
				<DSButton
					variant="outline"
					size="icon"
					@click="router.back()"
				>
					<DSIcon name="arrowLeft" />
				</DSButton>

				<h1 class="text-3xl font-semibold text-blue-seaence">
					{{ $pt("titleLinkPost", { title: postListPageInforamtion.document.title }) }}
				</h1>
			</div>

			<DSButton
				variant="primary"
				as-child
			>
				<RouterLink :to="postCreatePage.createTo({params: { documentId: params.documentId }})">
					{{ $pt("createPost") }}
				</RouterLink>
			</DSButton>

			<div v-if="postList && postList.length > 0">
				<div class="space-y-6">
					<PostRow
						v-for="post in postList"
						:key="post.id"
						:post="post"
						language="en-US"
					/>
				</div>

				<div class="mt-10 flex justify-center">
					<DSPagination
						:total="postListPageInforamtion.totalPostCount"
						:current-page="pageOfPostList"
						:quantity-per-page="postListPageInforamtion.quantityPostPerPage"
						@update="setPageOfPostList"
					/>
				</div>
			</div>

			<div
				v-else
				class="text-center text-gray-500 mt-10"
			>
				<p class="italic">
					{{ $pt("noPost") }}
				</p>
			</div>
		</div>
	</section>
</template>
