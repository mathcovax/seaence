<script setup lang="ts">
import { dashboardPage } from "@/domains/dashboard/router";
import { postPage } from "@/domains/post/router";
import ModuleCard from "../components/ModuleCard.vue";
import StatusCard from "../components/StatusCard.vue";

const { $pt } = dashboardPage.use();

const adminModule = [
	{
		name: "post",
		title: $pt("modules.post.title"),
		description: $pt("modules.post.description"),
		link: postPage,
	},
];

const services = [
	{
		name: "database",
		status: "up" as const,
	},
	{
		name: "cache",
		status: "down" as const,
	},
	{
		name: "queue",
		status: "down" as const,
	},
	{
		name: "api",
		status: "up" as const,
	},
];
</script>

<template>
	<section class="mb-6">
		<h1 class="text-3xl font-bold">
			{{ $pt("title") }}
		</h1>

		<p class="text-muted-foreground">
			{{ $pt("description") }}
		</p>
	</section>

	<section class="mt-6">
		<h2 class="text-xl font-semibold mb-4">
			{{ $pt("status.title") }}
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<StatusCard
				v-for="service in services"
				:key="service.name"
				:service-name="service.name"
				:status="service.status"
			/>
		</div>
	</section>

	<section class="mt-6">
		<h2 class="text-xl font-semibold mb-4">
			{{ $pt("modules.title") }}
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<RouterLink
				v-for="module in adminModule"
				:key="module.name"
				:to="postPage"
				class="group"
			>
				<ModuleCard
					:title="module.title"
					:description="module.description"
				/>
			</RouterLink>
		</div>
	</section>
</template>
