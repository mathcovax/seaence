<script setup lang="ts">
import { dashboardPage } from "@/domains/dashboard/dashboardPage/router";

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
			<h3 class="font-semibold">
				{{ serviceName }}
			</h3>

			<DSBadge
				:variant="status === 'up' ? 'success' : 'destructive'"
				class="font-semibold"
			>
				{{ status === 'up' ? $pt("status.up") : $pt("status.down") }}
			</DSBadge>
		</div>
	</DSCard>
</template>
