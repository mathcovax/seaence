<script setup lang="ts">
interface Props {
	serviceName: string;
	status: "up" | "down";
}

defineProps<Props>();

const { $pt } = dashboardPage.use();

const statusConfig = {
	up: {
		color: "text-green-600",
		bgColor: "bg-green-100",
		label: $pt("status.up"),
	},
	down: {
		color: "text-red-600",
		bgColor: "bg-red-100",
		label: $pt("status.down"),
	},
};
</script>

<template>
	<div class="p-4 flex items-center justify-between border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
		<h3 class="font-medium">
			{{ serviceName }}
		</h3>

		<div class="flex items-center space-x-2">
			<span
				:class="[
					statusConfig[status].color,
					'text-lg leading-none'
				]"
			>
				●
			</span>

			<span
				:class="[
					statusConfig[status].color,
					statusConfig[status].bgColor,
					'px-2 py-1 rounded-full text-xs font-medium'
				]"
			>
				{{ statusConfig[status].label }}
			</span>
		</div>
	</div>
</template>
