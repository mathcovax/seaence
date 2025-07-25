<script setup lang="ts">
import type { BakedDocumentSearchResult } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

const props = defineProps<{
	searchResult: BakedDocumentSearchResult;
}>();

const score = computed(() => Math.ceil(props.searchResult.score));
const authors = computed(() => props.searchResult.authors.join(", "));
const wenPublishDate = computed(
	() => props.searchResult.webPublishDate
		? new Date(props.searchResult.webPublishDate).toLocaleDateString()
		: "N/A",
);
const journalPublishDate = computed(
	() => props.searchResult.journalPublishDate
		? new Date(props.searchResult.journalPublishDate).toLocaleDateString()
		: "N/A",
);
const keywords = computed(() => props.searchResult.keywords?.join(", "));
</script>

<template>
	<RouterLink
		data-testid="document-result-row"
		:data-testvalue="searchResult.bakedDocumentId"
		:to="documentPage.createTo({ params: { id: searchResult.bakedDocumentId } })"
		class="group flex flex-col items-start p-4 sm:p-6 border-b border-muted hover:bg-muted/5 transition-colors"
	>
		<div class="w-full flex flex-wrap items-center gap-2 mb-1">
			<span class="text-xs text-muted-foreground shrink-0">{{ $t("documentRowResult.searchScore", [score]) }}</span>

			<div class="w-full flex gap-1 flex-wrap">
				<DSBadge
					v-for="articleType in searchResult.articleTypes"
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

		<h3
			class="text-base first-letter:capitalize sm:text-lg font-semibold text-primary group-hover:underline transition-colors break-words"
			v-html="searchResult.title"
		/>

		<p
			class="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 break-words"
			v-html="searchResult.summary"
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
				v-if="searchResult.webPublishDate"
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
				v-if="searchResult.webPublishDate"
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
				v-if="searchResult.keywords?.length"
				class="flex items-center gap-1"
			>
				<DSIcon
					name="tag"
					size="small"
					class="shrink-0"
				/>

				<span v-html="keywords" />
			</div>

			<DSIcon
				v-if="searchResult.userHaveLinkedDocumentInFolder"
				name="folderFileOutline"
				size="small"
				class="shrink-0"
			/>
		</div>
	</RouterLink>
</template>

<style>
.matching-result {
	font-weight: 900;
	color: var(--pink-seaence);
}

.matching-result-strict {
	font-weight: 900;
	color: var(--purple-seaence);
}

.matching-result-strict .matching-result {
	font-weight: 900;
	color: var(--purple-seaence);
}
</style>
