<script setup lang="ts">
import { mdiViewGrid, mdiFormatListBulletedSquare } from "@mdi/js";
import DocumentResultCard from "../components/DocumentResultCard.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";
import SearchResutPagination from "../components/SearchResutPagination.vue";
import { computed, ref } from "vue";

// Mock data
const START_INDEX = 1;
const documents = Array.from({ length: 18 }, (unused, index) => ({
	id: index + START_INDEX,
	title: `Document ${index + START_INDEX}`,
	description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore etdolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
	author: "Albert Einstein",
	imageUrl: "https://picsum.photos/100/100",
}));
const START_PAGE = 1;
const currentPage = ref(START_PAGE);
const productPerPage = 12;

const PAGE_OFFSET = 1;
const paginatedDocuments = computed(() => {
	const start = (currentPage.value - PAGE_OFFSET) * productPerPage;
	const end = start + productPerPage;
	return documents.slice(start, end);
});
// End mock data

function handlePageChange(page: number) {
	currentPage.value = page;
	window.scrollTo({ top: 0 });
}
</script>

<template>
	<section class="min-h-[calc(100vh-6rem-2rem)] space-y-12 flex flex-col">
		<DSInputSearch
			button-text="Rechercher"
			class="sticky top-28 z-10 w-full max-w-xl mx-auto"
		/>

		<DSTabs
			v-if="documents && documents.length > 0"
			default-value="cards"
		>
			<DSTabsList class="w-36 grid grid-cols-2">
				<DSTabsTrigger
					value="cards"
					title="Cards"
				>
					<TheIcon :icon="mdiViewGrid" />
				</DSTabsTrigger>

				<DSTabsTrigger
					value="rows"
					title="Rows"
				>
					<TheIcon :icon="mdiFormatListBulletedSquare" />
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
				No documents found
			</p>
		</div>
	</section>
</template>
