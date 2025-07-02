<script setup lang="ts">
import { dashboardPage } from "@/domains/dashboard/dashboardPage/router";
import { postPage } from "@/domains/forum/postModeration/router";
import {
	reportingBakedDocumentTranslationListPage,
} from "@/domains/reporting/reportingBakedDocumentTranslationList/router";
import ModuleCard from "./components/ModuleCard.vue";
import { answerPage } from "@/domains/forum/answerModeration/router";
// import StatusCard from "./components/StatusCard.vue";

const { $pt } = dashboardPage.use();

const adminModule = [
	{
		name: "post",
		title: $pt("modules.post.title"),
		description: $pt("modules.post.description"),
		link: postPage,
		icon: "post" as const,
	},
	{
		name: "answer",
		title: $pt("modules.answer.title"),
		description: $pt("modules.answer.description"),
		link: answerPage,
		icon: "answer" as const,
	},
	{
		name: "reportingBakedDocumentTranslation",
		title: $pt("modules.reportingBakedDocumentTranslation.title"),
		description: $pt("modules.reportingBakedDocumentTranslation.description"),
		link: reportingBakedDocumentTranslationListPage,
		icon: "reporting" as const,
	},
];
</script>

<template>
	<section class="mb-8">
		<h1 class="mb-2 text-3xl font-bold">
			{{ $pt("title") }}
		</h1>

		<p class="text-muted-foreground">
			{{ $pt("description") }}
		</p>
	</section>

	<!-- <section class="mt-6">
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
	</section> -->

	<section class="mt-6">
		<h2 class="text-xl font-semibold mb-4">
			{{ $pt("modules.title") }}
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<RouterLink
				v-for="module in adminModule"
				:key="module.name"
				:to="module.link"
				class="group"
			>
				<ModuleCard
					:title="module.title"
					:description="module.description"
					:icon="module.icon"
				/>
			</RouterLink>
		</div>
	</section>
</template>
