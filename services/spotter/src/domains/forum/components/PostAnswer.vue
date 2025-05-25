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
	<DSCard class="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-sm transition-shadow">
		<p class="text-gray-800 mb-4 whitespace-pre-line">
			{{ answer.content }}
		</p>

		<div class="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
			<div class="flex items-center gap-2">
				<DSIcon
					name="account"
					size="small"
				/>

				<span>{{ $pt("authorIs", { author: answer.author.username }) }}</span>
			</div>

			<div class="flex items-center gap-2">
				<DSIcon
					name="calendar"
					size="small"
				/>

				<span>{{ getRelativeTime(answer.createdAt) }}</span>
			</div>
		</div>
	</DSCard>
</template>
