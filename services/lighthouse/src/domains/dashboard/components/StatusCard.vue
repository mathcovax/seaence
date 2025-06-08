<script setup lang="ts">
interface Props {
	serviceName: string;
	status: "up" | "down";
}

defineProps<Props>();

const { $pt } = dashboardPage.use();
</script>

<template>
	<DSCard>
		<div class="flex items-center justify-between">
			<h3 class="font-medium">
				{{ serviceName }}
			</h3>

			<DSBadge :variant="status === 'up' ? 'success' : 'destructive'">
				{{ status === 'up' ? $pt("status.up") : $pt("status.down") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
