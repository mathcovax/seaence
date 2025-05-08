<script setup lang="ts">
import { usePostListPage } from "../composables/usePostListPage";
import { getRelativeTime } from "@vendors/design-system/lib/utils";

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
	<section>
		<div
			v-if="postListPageInforamtion"
			class="flex flex-col gap-6"
		>
			<div
				class="sticky top-24 z-5 mb-4 p-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center bg-white rounded-b-lg shadow-md"
			>
				<DSButtonIcon
					as-child
					variant="outline"
					class="self-start"
				>
					<RouterLink to="#">
						<DSIcon name="arrowLeft" />
					</RouterLink>
				</DSButtonIcon>

				<h1
					:title="postListPageInforamtion.document.title"
					class="text-3xl font-semibold line-clamp-3"
				>
					{{ $pt("titleLinkPost", { title: postListPageInforamtion.document.title }) }}
				</h1>
			</div>

			<div v-if="postList && postList.length > 0">
				<div class="space-y-6">
					<div
						v-for="post in postList"
						:key="post.id"
					>
						<DSCard class="bg-white p-6">
							<RouterLink
								:to="postPage.createTo({
									params: { postId: post.id },
									query: { language: postListPageInforamtion.document.language }
								})"
							>
								<h3 class="text-2xl font-semibold text-blue-seaence mb-2 hover:underline">
									{{ post.topic }}
								</h3>
							</RouterLink>

							<p class="text-gray-700 mb-4 line-clamp-3">
								{{ post.content }}
							</p>

							<div class="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
								<div class="flex items-center gap-2">
									<DSIcon
										name="account"
										size="14"
									/>

									<span>{{ $pt("authorIs", { author: post.author.username }) }}</span>
								</div>

								<div class="flex items-center gap-2">
									<DSIcon
										name="calendar"
										size="14"
									/>

									<span>{{ getRelativeTime(post.createdAt) }}</span>
								</div>

								<div class="flex items-center gap-2">
									<DSIcon
										name="forum"
										size="14"
									/>

									<span>{{ $pt("responseCount", {count: post.answerCount}) }}</span>
								</div>
							</div>
						</DSCard>
					</div>
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
				class="flex flex-col items-center justify-center py-16 text-center"
			>
				<p class="text-xl text-muted-foreground">
					{{ $pt("noPost") }}
				</p>
			</div>
		</div>
	</section>
</template>
