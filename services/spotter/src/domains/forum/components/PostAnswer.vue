<script setup lang="ts">
import type { Answer } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { getRelativeTime } from "@vendors/design-system/lib/utils";

interface Props {
	answer: Answer;
}

defineProps<Props>();

const { $pt } = postPage.use();
</script>

<template>
	<DSCard>
		<p class="whitespace-pre-line">
			{{ answer.content }}
		</p>

		<small
			v-if="answer.status === 'notCompliant'"
			class="text-muted-foreground"
		>
			{{ $pt("notCompliantContent") }}
		</small>

		<template #footer>
			<div class="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
				<div class="flex items-center gap-2">
					<DSIcon
						name="account"
						size="small"
					/>

					<span v-if="answer.authorName">
						{{ $pt("authorIs", { author: answer.authorName }) }}
					</span>

					<i v-else>
						{{ $t("post.deletedAuthors") }}
					</i>
				</div>

				<div class="flex items-center gap-2">
					<DSIcon
						name="calendar"
						size="small"
					/>

					<span>{{ getRelativeTime(answer.createdAt) }}</span>
				</div>
			</div>
		</template>
	</DSCard>
</template>
