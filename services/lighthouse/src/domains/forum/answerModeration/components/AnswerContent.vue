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
				<div>
					<div class="flex gap-4 items-center text-sm text-muted-foreground mb-2">
						<div class="flex gap-2 items-center">
							<DSIcon
								name="account"
								size="small"
							/>

							<span class="font-medium">{{ answer.authorName }}</span>
						</div>

						<div class="flex gap-2 items-center">
							<DSIcon
								name="calendar"
								size="small"
							/>

							<span>{{ getRelativeTime(answer.createdAt) }}</span>
						</div>
					</div>
				</div>

				<DSBadge
					variant="outline"
					class="text-orange-600 bg-orange-50 border-orange-200"
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
