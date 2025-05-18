<script setup lang="ts">
import type { ArticleType } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Document {
	score: number;
	bakedDocumentId: string;
	title: string;
	articleTypes: ArticleType[];
	authors: string[];
	webPublishDate: string | null;
	journalPublishDate: string | null;
	summary: string | null;
	keywords: string[] | null;
}

const props = defineProps<{
	document: Document;
}>();

const score = computed(() => Math.ceil(props.document.score));
const authors = computed(() => props.document.authors.join(", "));
const wenPublishDate = computed(
	() => props.document.webPublishDate
		? new Date(props.document.webPublishDate).toLocaleDateString()
		: "N/A",
);
const journalPublishDate = computed(
	() => props.document.journalPublishDate
		? new Date(props.document.journalPublishDate).toLocaleDateString()
		: "N/A",
);
const keywords = computed(() => props.document.keywords?.join(", "));
</script>

<template>
	<div class="flex flex-col items-start p-4 sm:p-6 border-b border-muted hover:bg-muted/5 transition-colors">
		<div class="w-full flex flex-wrap items-center gap-2 mb-1">
			<span class="text-xs text-muted-foreground shrink-0">Score: {{ score }}</span>

			<div class="w-full flex gap-1 flex-wrap">
				<DSBadge
					v-for="articleType in document.articleTypes"
					:key="articleType"
					variant="outline"
					class="max-w-full text-xs overflow-hidden"
					:title="$t(`articleType.${articleType}`)"
				>
					<span class="truncate block">
						{{ $t(`articleType.${articleType}`) }}
					</span>
				</DSBadge>
			</div>
		</div>

		<RouterLink
			:to="documentPage.createTo({ params: { id: document.bakedDocumentId } })"
			class="group block"
		>
			<h3
				class="text-base sm:text-lg font-semibold text-primary group-hover:underline transition-colors break-words *:text-green-seaence"
				v-html="document.title"
			/>
		</RouterLink>

		<p
			class="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 break-words"
			v-html="document.summary"
		/>

		<div class="mt-4 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-muted-foreground">
			<div class="flex items-center gap-1">
				<DSIcon
					name="account"
					size="small"
					class="shrink-0"
				/>

				<span v-html="authors" />
			</div>

			<div
				v-if="document.webPublishDate"
				class="flex items-center gap-1"
			>
				<DSIcon
					name="calendar"
					size="small"
					class="shrink-0"
				/>

				<span>{{ journalPublishDate }}</span>
			</div>

			<div
				v-if="document.webPublishDate"
				class="flex items-center gap-1"
			>
				<DSIcon
					name="web"
					size="small"
					class="shrink-0"
				/>

				<span>{{ wenPublishDate }}</span>
			</div>

			<div
				v-if="document.keywords?.length"
				class="flex items-center gap-1"
			>
				<DSIcon
					name="tag"
					size="small"
					class="shrink-0"
				/>

				<span v-html="keywords" />
			</div>
		</div>
	</div>
</template>

<style>
.matching-result {
	font-weight: 900;
}
</style>
