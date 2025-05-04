<script setup lang="ts">
import DocumentResultCard from "../components/DocumentResultCard.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";
import SearchResutPagination from "../components/SearchResutPagination.vue";
import { computed, ref } from "vue";
import SimpleSearch from "../components/SimpleSearch.vue";
import TheFilters from "../components/TheFilters.vue";

const { $pt } = simpleSearchPage.use();

const isResultExpanded = ref(false);
const isFiltersVisible = ref(false);

type DisplayMode = "cards" | "rows";

const initialDisplayMode: DisplayMode = "cards";
const storedDisplayMode = useLocalStorageItem<DisplayMode>("displayMode");
const displayMode = computed({
	get: () => storedDisplayMode.value ?? initialDisplayMode,
	set: (value) => {
		storedDisplayMode.value = value;
	},
});

// Mock data
const startIndex = 1;
const documents = Array.from({ length: 180 }, (_unused, index) => ({
	id: index + startIndex,
	title: `Document ${index + startIndex}`,
	description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore etdolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
	author: "Albert Einstein",
	imageUrl: "https://picsum.photos/300",
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

function updateDisplayMode(mode: string | number) {
	displayMode.value = mode as DisplayMode;
}

function handlePageChange(page: number) {
	currentPage.value = page;
	window.scrollTo({ top: 0 });
}
</script>

<template>
	<section class="min-h-[calc(100vh-6rem-2rem)] flex flex-col justify-between">
		<div
			class="min-h-32 p-4 flex flex-col justify-center gap-8 items-center transition-all duration-1500 ease-in-out overflow-hidden"
			:class="{
				'flex-1': !isResultExpanded,
				'sticky top-24 z-10 bg-white': isResultExpanded
			}"
		>
			<SimpleSearch
				@click="isResultExpanded = !isResultExpanded"
				:large="true"
				class="w-full max-w-xl mx-auto"
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
			class="h-full -mb-4 bg-background rounded-t-lg transition-all duration-1500 ease-in-out overflow-hidden"
			:class="isResultExpanded ? 'max-h-[3236px]' : 'max-h-0'"
		>
			<DSTabs
				v-if="documents && documents.length > 0"
				:default-value="displayMode"
				@update:model-value="updateDisplayMode"
				class="p-4"
			>
				<DSTabsList class="w-36 grid grid-cols-2">
					<DSTabsTrigger
						value="cards"
						title="Cards"
					>
						<DSIcon name="viewGrid" />
					</DSTabsTrigger>

					<DSTabsTrigger
						value="rows"
						title="Rows"
					>
						<DSIcon name="formatListBulletedSquare" />
					</DSTabsTrigger>
				</DSTabsList>

				<SearchResutPagination
					:total="documents.length"
					:current-page="currentPage"
					:product-per-page="productPerPage"
					@update="handlePageChange"
					:key="'top-pagination-' + currentPage"
				/>

				<DSTabsContent value="cards">
					<div class="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
						<DocumentResultCard
							v-for="document in paginatedDocuments"
							:key="document.id"
							:document="document"
						/>
					</div>
				</DSTabsContent>

				<DSTabsContent value="rows">
					<div class="w-full max-w-5xl mx-auto">
						<DocumentResultRow
							v-for="document in paginatedDocuments"
							:key="document.id"
							:document="document"
						/>
					</div>
				</DSTabsContent>

				<SearchResutPagination
					:total="documents.length"
					:current-page="currentPage"
					:product-per-page="productPerPage"
					@update="handlePageChange"
					:key="'bottom-pagination-' + currentPage"
				/>
			</DSTabs>

			<div
				v-else
				class="grow flex items-center justify-center"
			>
				<p class="text-2xl text-gray-500">
					{{ $pt("noResults") }}
				</p>
			</div>

			<DSSea />
		</div>
	</section>
</template>
