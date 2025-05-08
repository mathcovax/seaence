<script setup lang="ts">
import { computed, ref } from "vue";
import SimpleSearch from "../components/SimpleSearch.vue";
import TheFilters from "../components/TheFilters.vue";
import SearchResutPagination from "../components/SearchResutPagination.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";

const { $pt } = simpleSearchPage.use();

const isResultExpanded = ref(false);
const isFiltersVisible = ref(false);

// Mock data
type ArticleType = "RESEARCH_ARTICLE" | "PEER_REVIEWED" | "CONFERENCE_PAPER" | "REVIEW_ARTICLE" | "BOOK_CHAPTER";

const config = {
	year: 2024,
	month: 12,
	day: 28,
};

const startIndex = 1;
const documents = Array.from({ length: 180 }, (_unused, index) => ({
	score: Math.random(),
	abysBakedDocumentId: `doc-${index + startIndex}`,
	title: `Scientific Research Paper ${index + startIndex}`,
	articleType: ["RESEARCH_ARTICLE", "PEER_REVIEWED"] as ArticleType[],
	authors: [
		"<strong>Albert Einstein</strong>",
		"Marie Curie",
		"Isaac Newton",
	],
	webPublishDate:
		new Date(
			config.year,
			Math.floor(Math.random() * config.month),
			Math.floor(Math.random() * config.day),
		).toISOString(),
	journalPublishDate:
		new Date(
			config.year,
			Math.floor(Math.random() * config.month),
			Math.floor(Math.random() * config.day),
		).toISOString(),
	summary: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor <strong>incididunt</strong> ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `,
	keywords: ["physics", "<strong>quantum mechanics</strong>", "relativity", "particle physics"],
}));
// End mock data

const startPage = 1;
const pageOffset = 1;
const currentPage = ref(startPage);
const productPerPage = 12;

const paginatedDocuments = computed(() => {
	const start = (currentPage.value - pageOffset) * productPerPage;
	const end = start + productPerPage;
	return documents.slice(start, end);
});

function handlePageChange(page: number) {
	currentPage.value = page;
	window.scrollTo({ top: 0 });
}

function handleLanguageChange(language: string) {
	console.log("Selected language:", language);
}
</script>

<template>
	<section class="min-h-[calc(100vh-6rem-2rem)] flex flex-col justify-between">
		<div
			class="min-h-32 p-6 flex flex-col justify-center gap-8 items-center transition-all duration-1500 ease-in-out overflow-hidden"
			:class="{
				'flex-1': !isResultExpanded,
				'sticky top-24 z-10 bg-white rounded-md shadow-md': isResultExpanded
			}"
		>
			<SimpleSearch
				@click="isResultExpanded = !isResultExpanded"
				:large="true"
				class="w-full max-w-xl mx-auto"
				@update:language="handleLanguageChange"
			/>

			<div
				v-if="isResultExpanded"
				class="w-full"
			>
				<div class="flex justify-between items-center mb-4">
					<DSButtonOutline
						@click="isFiltersVisible = !isFiltersVisible"
					>
						<span>{{ isFiltersVisible ? $pt("hideFilters") : $pt("showFilters") }}</span>
					</DSButtonOutline>

					<span class="text-sm text-gray-500 flex items-center">{{ $pt("foundResults", { count: documents.length }) }}</span>
				</div>

				<TheFilters :is-filters-visible="isFiltersVisible" />
			</div>
		</div>

		<div
			v-if="documents && documents.length > 0"
			class="h-full -mb-4 bg-background rounded-t-md shadow-md transition-all duration-1500 ease-in-out overflow-hidden"
			:class="isResultExpanded ? 'max-h-[3236px]' : 'max-h-0'"
		>
			<SearchResutPagination
				:total="documents.length"
				:current-page="currentPage"
				:product-per-page="productPerPage"
				@update="handlePageChange"
				:key="'top-pagination-' + currentPage"
			/>

			<div class="w-full max-w-5xl mx-auto">
				<DocumentResultRow
					v-for="(document, index) in paginatedDocuments"
					:key="index"
					:document="document"
				/>
			</div>

			<SearchResutPagination
				:total="documents.length"
				:current-page="currentPage"
				:product-per-page="productPerPage"
				@update="handlePageChange"
				:key="'bottom-pagination-' + currentPage"
			/>
		</div>

		<div
			v-else
			class="grow flex items-center justify-center"
		>
			<p class="text-2xl text-gray-500">
				{{ $pt("noResults") }}
			</p>
		</div>

		<DSSea />
	</section>
</template>
