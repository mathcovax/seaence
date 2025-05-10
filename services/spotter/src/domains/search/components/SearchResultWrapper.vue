<script setup lang="ts">
import type { bakedDocumentSearchResult, Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import DocumentResultRow from "./DocumentResultRow.vue";

interface Result {
	total: number;
	quantityPerPage: number;
	facets: Facet[];
	searchResult: bakedDocumentSearchResult[];
}

interface Props {
	result: Result | null;
	isFetching: boolean;
	pageOfBakedDocumentSearchResult: number;
}

defineProps<Props>();
const emit = defineEmits<{
	updatePage: [page: number];
}>();

function updatePage(page: number) {
	emit("updatePage", page);
}
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
			class="bg-white flex flex-col items-stretch rounded-b-xl"
		>
			<DSPagination
				:total="result.total"
				:current-page="pageOfBakedDocumentSearchResult"
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
				:total="result.total"
				:current-page="pageOfBakedDocumentSearchResult"
				:quantity-per-page="result.quantityPerPage"
				@update="updatePage"
			/>
		</div>

		<div
			v-else-if="result"
			class="grow flex items-center justify-center mt-20"
		>
			<p class="text-2xl text-gray-500">
				{{ $t("search.noResult") }}
			</p>
		</div>
	</div>
</template>
