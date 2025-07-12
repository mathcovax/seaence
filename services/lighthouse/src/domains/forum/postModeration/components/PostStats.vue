<script setup lang="ts">
import { postPage } from "@/domains/forum/postModeration/router";
import DSCard from "@vendors/design-system/components/ui/card/DSCard.vue";

interface Props {
	pendingCount: number;
}

defineProps<Props>();

const { $pt } = postPage.use();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<DSCard>
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm">
						{{ $pt("postStats.pending") }}
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
