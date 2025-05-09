<script setup lang="ts">
type ArticleType = "RESEARCH_ARTICLE" | "PEER_REVIEWED" | "CONFERENCE_PAPER" | "REVIEW_ARTICLE" | "BOOK_CHAPTER";

interface Document {
	score: number;
	abysBakedDocumentId: string;
	title: string;
	articleType: ArticleType[];
	authors: string[];
	webPublishDate: string | null;
	journalPublishDate: string | null;
	summary: string | null;
	keywords: string[] | null;
}

defineProps<{
	document: Document;
}>();
</script>

<template>
	<div class="flex items-start gap-4 p-6 border-b border-muted hover:bg-muted/5 transition-colors">
		<div class="flex-1">
			<div class="flex items-center gap-2 mb-1">
				<span class="text-xs text-muted-foreground">Score: {{ Math.round(document.score * 100) }}%</span>

				<div class="flex gap-1">
					<DSBadge
						v-for="type in document.articleType"
						:key="type"
						variant="outline"
						class="text-xs"
					>
						{{ type }}
					</DSBadge>
				</div>
			</div>

			<RouterLink
				:to="documentPage.createTo({ params: { id: document.abysBakedDocumentId } })"
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
						size="16"
					/>

					<span v-html="document.authors.join(', ')" />
				</div>

				<div
					v-if="document.webPublishDate"
					class="flex items-center gap-1"
				>
					<DSIcon
						name="calendar"
						size="14"
					/>

					<span>{{ new Date(document.webPublishDate).toLocaleDateString() }}</span>
				</div>

				<div
					v-if="document.keywords?.length"
					class="flex items-center gap-1"
				>
					<DSIcon
						name="tag"
						size="14"
					/>

					<span v-html="document.keywords.join(', ')" />
				</div>
			</div>
		</div>
	</div>
</template>
