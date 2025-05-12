<script setup lang="ts">
import { useSearchPage } from "../composables/useSearchPage";
import type { OperatorContent } from "@vendors/types-advanced-query";
import type { BakedDocumentLanguage, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import SearchResultWrapper from "../components/SearchResultWrapper.vue";
import TheScratch from "../components/scratch/TheScratch.vue";
import SearchContainer from "../components/SearchContainer.vue";

const router = useRouter();
const { query } = advancedSearchPage.use();
const { scrollToTop } = useScroll();
const {
	search,
	setPage,
	result,
	pageOfBakedDocumentSearchResult,
	isFetching,
} = useSearchPage();

const scratchContent = ref<OperatorContent | null>({
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
const bakedDocumentLanguage = ref<BakedDocumentLanguage>(query.value.language);
const term = ref(query.value.term);
const isScratchExpanded = ref(true);
const isScratchContentVisible = ref(true);
const filtersValues = ref<FiltersValues>({});
const isResultExpanded = ref(!!term.value);

function toggleScratch() {
	isScratchExpanded.value = !isScratchExpanded.value;
	if (!isScratchExpanded.value) {
		isScratchContentVisible.value = false;
	} else {
		isScratchContentVisible.value = true;
	}
}

function onSubmit() {
	console.log("onSubmit", scratchContent.value);
	isResultExpanded.value = true;

	void router.push(
		advancedSearchPage.createTo({
			query: {
				term: term.value,
				language: bakedDocumentLanguage.value,
			},
		}),
	);

	void search({
		language: bakedDocumentLanguage.value,
		page: pageOfBakedDocumentSearchResult.value,
		term: term.value,
		filtersValues: filtersValues.value,
	});

	isResultExpanded.value = true;
}

if (term.value) {
	onSubmit();
}

onMounted(() => {
	scrollToTop();
});
</script>

<template>
	<section class="relative min-h-screen-nh flex flex-col items-stretch">
		<div
			v-if="isFetching"
			class="w-full h-full absolute top-0 left-0 z-20"
		/>

		<SearchContainer
			search-mode="advanced"
			:is-expanded="isResultExpanded"
			:is-fetching="isFetching"
			:result="result"
			:total="result?.total"
			v-model:filters-values="filtersValues"
			@commit-filters-values="onSubmit"
		>
			<div class="w-full space-y-4">
				<transition
					enter-active-class="transition duration-500 ease-out"
					enter-from-class="transform -translate-y-4 opacity-0"
					enter-to-class="transform translate-y-0 opacity-100"
					leave-active-class="transition duration-300 ease-in"
					leave-from-class="transform translate-y-0 opacity-100"
					leave-to-class="transform -translate-y-4 opacity-0"
				>
					<div
						v-show="isScratchExpanded"
						class="overflow-hidden"
					>
						<TheScratch
							v-if="isScratchContentVisible"
							:term="term"
							:language="bakedDocumentLanguage"
							v-model="scratchContent"
							@submit="onSubmit"
						/>
					</div>
				</transition>
			</div>

			<template #scratchToggle>
				<DSButtonOutline
					v-if="isResultExpanded"
					@click="toggleScratch"
				>
					{{ isScratchExpanded ? $t("search.scratch.hide") : $t("search.scratch.show") }}
				</DSButtonOutline>
			</template>
		</SearchContainer>

		<SearchResultWrapper
			:result="result"
			:is-fetching="isFetching"
			:page-of-baked-document-search-result="pageOfBakedDocumentSearchResult"
			@update-page="setPage"
		/>

		<DSSea :speed="isFetching" />
	</section>
</template>
