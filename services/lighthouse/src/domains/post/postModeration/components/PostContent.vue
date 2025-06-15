<script setup lang="ts">
import { postPage } from "@/domains/post/postModeration/router";
import type { Post } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { getRelativeTime } from "@vendors/design-system/lib/utils";

interface Props {
	post: Post;
}

defineProps<Props>();

const { $pt } = postPage.use();
</script>

<template>
	<DSCard>
		<template #header>
			<div class="flex justify-between items-start">
				<div>
					<h2 class="mb-2 text-xl text-blue-seaence font-semibold">
						{{ post.topic }}
					</h2>

					<div class="flex gap-4 items-center text-sm text-muted-foreground">
						<div class="flex gap-2 items-center">
							<DSIcon
								name="account"
								size="small"
							/>

							<span>{{ post.author.username }}</span>
						</div>

						<div class="flex gap-2 items-center">
							<DSIcon
								name="calendar"
								size="small"
							/>

							<span>{{ getRelativeTime(post.createdAt) }}</span>
						</div>
					</div>
				</div>

				<DSBadge
					variant="outline"
					class="text-orange-600 bg-orange-50 border-orange-200"
				>
					{{ $pt("postStatus") }}
				</DSBadge>
			</div>
		</template>

		<div class="prose max-w-none">
			<p class="leading-relaxed whitespace-pre-line">
				{{ post.content }}
			</p>
		</div>

		<template #footer>
			<slot />
		</template>
	</DSCard>
</template>
