<script setup lang="ts">
import type { Post, BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { getRelativeTime } from "@vendors/design-system/lib/utils";

const { $pt } = postListPage.use();

interface Props {
	post: Post;
	language: BakedDocumentLanguage;
}

defineProps<Props>();

</script>

<template>
	<DSCard
		class="bg-background p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
	>
		<div class="mb-4 flex flex-col gap-2">
			<RouterLink
				:to="postPage.createTo({
					params: {postId: post.id},
					query: {language}
				})"
				class="text-2xl font-semibold text-blue-seaence hover:underline"
			>
				{{ post.topic }}
			</RouterLink>

			<p class="text-gray-700 w-full text-ellipsis overflow-hidden">
				{{ post.content }}
			</p>
		</div>

		<div class="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
			<div class="flex items-center gap-2">
				<DSIcon
					name="account"
					size="small"
				/>

				<span>{{ $pt("authorIs", { author: post.author.username }) }}</span>
			</div>

			<div class="flex items-center gap-2">
				<DSIcon
					name="calendar"
					size="small"
				/>

				<span>{{ getRelativeTime(post.createdAt) }}</span>
			</div>

			<div class="flex items-center gap-2">
				<DSIcon
					name="forum"
					size="small"
				/>

				<span>{{ $pt("responseCount", {count: post.answerCount}) }}</span>
			</div>
		</div>
	</DSCard>
</template>
