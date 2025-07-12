<script setup lang="ts">
import DSCard from "@vendors/design-system/components/ui/card/DSCard.vue";
import { answerPage } from "../router";

interface Props {
	pendingCount: number;
}

defineProps<Props>();

const { $pt } = answerPage.use();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<DSCard>
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm">
						{{ $pt("answerStats.pending") }}
					</p>

					<p class="text-2xl text-warning font-bold">
						{{ pendingCount }}
					</p>
				</div>

				<DSIcon
					name="clock"
					class="text-warning"
				/>
			</div>
		</DSCard>
	</div>
</template>
