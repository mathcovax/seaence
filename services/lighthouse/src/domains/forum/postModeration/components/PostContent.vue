<script setup lang="ts">
import { postPage } from "@/domains/forum/postModeration/router";
import type { PostModerationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { getRelativeTime } from "@vendors/design-system/lib/utils";

interface Props {
	post: PostModerationPage["post"];
}

defineProps<Props>();

const { $pt } = postPage.use();
</script>

<template>
	<DSCard>
		<template #header>
			<div class="flex justify-between items-start">
				<div class="flex flex-col gap-2 sm:gap-0">
					<h2 class="mb-2 text-xl text-blue-seaence font-semibold">
						{{ post.topic }}
					</h2>

					<div class="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
						<div class="flex gap-2 items-center">
							<DSIcon
								name="account"
								size="small"
								class="shrink-0"
							/>

							<span v-if="post.authorName">
								{{ post.authorName }}
							</span>

							<i v-else>
								{{ $t("post.deletedAuthors") }}
							</i>

							{{ post.authorId }}
						</div>

						<div class="flex gap-2 items-center">
							<DSIcon
								name="calendar"
								size="small"
								class="shrink-0"
							/>

							<span>{{ getRelativeTime(post.createdAt) }}</span>
						</div>
					</div>
				</div>

				<DSBadge
					variant="outline"
					class="text-warning bg-warning/5 border-warning/20"
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
