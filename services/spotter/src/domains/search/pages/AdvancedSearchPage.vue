<script setup lang="ts">
import type { OperatorContent } from "@vendors/scratch-type";
import TheScratch from "../components/scratch/TheScratch.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";
import { computed, ref } from "vue";

const { $pt } = advancedSearchPage.use();

const isResultExpanded = ref(false);

const content = ref<OperatorContent | null>({
	type: "operator",
	name: "and",
	content: [
		{
			type: "comparator",
			name: "text",
			field: "allField",
			value: "",
		},
	],
});

const scratchRef = ref<InstanceType<typeof TheScratch> | null>();

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

const START_PAGE = 1;
const PAGE_OFFSET = 1;
const currentPage = ref(START_PAGE);
const productPerPage = 12;

const paginatedDocuments = computed(() => {
	const start = (currentPage.value - PAGE_OFFSET) * productPerPage;
	const end = start + productPerPage;
	return documents.slice(start, end);
});

function handleSubmit() {
	scratchRef.value!.checkFields();

	if (scratchRef.value!.checkFields()) {
		isResultExpanded.value = true;
	}
}

function handlePageChange(page: number) {
	currentPage.value = page;
	window.scrollTo({ top: 0 });
}

watch(
	content,
	(value) => void console.log(value),
	{ deep: true },
);
</script>

<template>
	<section class="min-h-[calc(100vh-6rem-2rem)] flex flex-col justify-between">
		<div
			class="min-h-32 transition-all duration-1500 ease-in-out overflow-hidden"
			:class="{
				'flex-1': !isResultExpanded,
				'sticky top-28 z-10': isResultExpanded
			}"
		>
			<template v-if="!isResultExpanded">
				<TheScratch
					ref="scratchRef"
					v-model="content"
				/>

				<DSButtonPrimary @click="handleSubmit">
					{{ $pt("scratch.checkFields") }}
				</DSButtonPrimary>
			</template>

			<DSButtonPrimary
				v-else
				@click="isResultExpanded = !isResultExpanded"
			>
				{{ $pt("scratch.hideResults") }}
			</DSButtonPrimary>
		</div>

		<div
			v-if="documents && documents.length > 0"
			class="h-full -mb-4 bg-background rounded-t-md shadow-md transition-all duration-1500 ease-in-out overflow-hidden"
			:class="isResultExpanded ? 'max-h-[3236px]' : 'max-h-0'"
		>
			<DSPagination
				:total="documents.length"
				:current-page="currentPage"
				:quantity-per-page="productPerPage"
				@update="handlePageChange"
			/>

			<div class="w-full max-w-5xl mx-auto">
				<DocumentResultRow
					v-for="(document, index) in paginatedDocuments"
					:key="index"
					:document="document"
				/>
			</div>

			<DSPagination
				:total="documents.length"
				:current-page="currentPage"
				:quantity-per-page="productPerPage"
				@update="handlePageChange"
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
