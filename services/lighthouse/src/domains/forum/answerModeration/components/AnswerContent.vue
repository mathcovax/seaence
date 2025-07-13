<script setup lang="ts">
import type { AnswerModerationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { getRelativeTime } from "@vendors/design-system/lib/utils";
import { answerPage } from "../router";

interface Props {
	answer: AnswerModerationPage["answer"];
}

defineProps<Props>();

const { $pt } = answerPage.use();
</script>

<template>
	<DSCard>
		<template #header>
			<div class="flex justify-between items-start">
				<div class="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
					<div class="flex gap-2 items-center">
						<DSIcon
							name="account"
							size="small"
							class="shrink-0"
						/>

						<span v-if="answer.authorName">
							{{ answer.authorName }}
						</span>

						<i v-else>
							{{ $t("post.deletedAuthors") }}
						</i>

						{{ answer.authorId }}
					</div>

					<div class="flex gap-2 items-center">
						<DSIcon
							name="calendar"
							size="small"
							class="shrink-0"
						/>

						<span>{{ getRelativeTime(answer.createdAt) }}</span>
					</div>
				</div>

				<DSBadge
					variant="outline"
					class="text-warning bg-warning/5 border-warning/20"
				>
					{{ $pt("answerStatus") }}
				</DSBadge>
			</div>
		</template>

		<div class="prose max-w-none">
			<p class="leading-relaxed whitespace-pre-line">
				{{ answer.content }}
			</p>
		</div>

		<template #footer>
			<slot />
		</template>
	</DSCard>
</template>
