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

const score = computed(() => Math.round(props.document.score));
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
	<div class="flex items-start gap-4 p-6 border-b border-muted hover:bg-muted/5 transition-colors">
		<div class="flex-1">
			<div class="flex items-center gap-2 mb-1">
				<span class="text-xs text-muted-foreground shrink-0">Score: {{ score }}</span>

				<div class="flex gap-1 flex-wrap">
					<DSBadge
						v-for="articleType in document.articleTypes"
						:key="articleType"
						variant="outline"
						class="text-xs"
					>
						{{ $t(`articleType.${articleType}`) }}
					</DSBadge>
				</div>
			</div>

			<RouterLink
				:to="documentPage.createTo({ params: { id: document.bakedDocumentId } })"
				class="group"
			>
				<h3
					class="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors"
					v-html="document.title"
				/>
			</RouterLink>

			<p
				class="mt-2 text-sm text-muted-foreground line-clamp-3"
				v-html="document.summary"
			/>

			<div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
				<div class="flex items-center gap-1">
					<DSIcon
						name="user"
						size="small"
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
					/>

					<span v-html="keywords" />
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.matching-result {
	font-weight: 900;
}
</style>
