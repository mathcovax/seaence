<script setup lang="ts">
import DocumentResultRow from "./DocumentResultRow.vue";
import type { SearchResult } from "../composables/useSearchPage";

interface Props {
	result: SearchResult | null;
	isFetching: boolean;
	currentPage: number;
}

defineProps<Props>();
const emit = defineEmits<{
	updatePage: [page: number];
}>();

function updatePage(page: number) {
	emit("updatePage", page);
}

const maxPage = 100;
</script>

<template>
	<div
		class="duration-1500 transition-all ease-in pb-10"
		:class="{
			'opacity-0': !result || isFetching
		}"
	>
		<div
			v-if="result && result.searchResult.length > 0"
			class="bg-background flex flex-col items-center rounded-b-xl"
		>
			<DSPagination
				class="my-8"
				:max-page="maxPage"
				:total="result.total"
				:current-page="currentPage"
				:quantity-per-page="result.quantityPerPage"
				@update="updatePage"
			/>

			<div class="w-full max-w-5xl mx-auto">
				<DocumentResultRow
					v-for="document in result.searchResult"
					:key="document.bakedDocumentId"
					:document="document"
				/>
			</div>

			<DSPagination
				class="my-8"
				:max-page="maxPage"
				:total="result.total"
				:current-page="currentPage"
				:quantity-per-page="result.quantityPerPage"
				@update="updatePage"
			/>
		</div>

		<div
			v-else
			class="mt-20 flex items-center justify-center"
		>
			<p class="p-3 text-2xl text-gray-700 rounded-xl bg-background/60 backdrop-blur-sm">
				{{ $t("search.noResult") }}
			</p>
		</div>
	</div>
</template>
