<script setup lang="ts">
import { postPage } from "@/domains/post/postModeration/router";

interface Props {
	pendingCount: number;
	approvedCount: number;
	rejectedCount: number;
}

defineProps<Props>();

const { $pt } = postPage.use();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<div class="p-4 bg-background border border-border rounded-lg shadow-sm">
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm">
						{{ $pt("postStats.pending") }}
					</p>

					<p class="text-2xl text-orange-600 font-bold">
						{{ pendingCount }}
					</p>
				</div>

				<DSIcon
					name="clock"
					class="text-orange-600"
				/>
			</div>
		</div>

		<div class="p-4 bg-background border border-border rounded-lg shadow-sm">
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm">
						{{ $pt("postStats.approved") }}
					</p>

					<p class="text-2xl text-green-seaence font-bold">
						{{ approvedCount }}
					</p>
				</div>

				<DSIcon
					name="check"
					class="text-green-seaence"
				/>
			</div>
		</div>

		<div class="p-4 bg-background border border-border rounded-lg shadow-sm">
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm">
						{{ $pt("postStats.rejected") }}
					</p>

					<p class="text-2xl text-destructive font-bold">
						{{ rejectedCount }}
					</p>
				</div>

				<DSIcon
					name="close"
					class="text-destructive"
				/>
			</div>
		</div>
	</div>
</template>
