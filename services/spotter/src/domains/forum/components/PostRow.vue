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
		:title="post.topic "
		class="hover:shadow-md transition"
		:link="postPage.createTo({
			params: { postId: post.id },
			query: { language }
		})"
	>
		{{ post.content }}

		<template #footer>
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
		</template>
	</DSCard>
</template>
