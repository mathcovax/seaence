<script setup lang="ts">
import DocumentResultCard from "../components/DocumentResultCard.vue";
import DocumentResultRow from "../components/DocumentResultRow.vue";
import SearchResutPagination from "../components/SearchResutPagination.vue";
import { computed, ref } from "vue";
import SimpleSearch from "../components/SimpleSearch.vue";

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
const filters = ref({
	articleType: "",
	species: "",
});

const articleTypes = ["Article scientifique", "Étude clinique", "Revue", "Méta-analyse", "Rapport de cas"];
const speciesOptions = ["Humain", "Souris", "Rat", "Singe", "Chien", "Autres"];

function resetFilters() {
	filters.value = {
		articleType: "",
		species: "",
	};
}

const START_INDEX = 1;
const documents = Array.from({ length: 180 }, (_unused, index) => ({
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
	imageUrl: "https://picsum.photos/300",
	articleType: articleTypes[Math.floor(Math.random() * articleTypes.length)],
	species: speciesOptions[Math.floor(Math.random() * speciesOptions.length)],
}));

const filteredDocuments = computed(() => documents.filter((doc) => {
	if (filters.value.articleType && doc.articleType !== filters.value.articleType) {
		return false;
	}

	if (filters.value.species && doc.species !== filters.value.species) {
		return false;
	}

	return true;
}));
// End mock data

const START_PAGE = 1;
const PAGE_OFFSET = 1;
const currentPage = ref(START_PAGE);
const productPerPage = 12;

const paginatedDocuments = computed(() => {
	const start = (currentPage.value - PAGE_OFFSET) * productPerPage;
	const end = start + productPerPage;
	return filteredDocuments.value.slice(start, end);
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
						<span>{{ isFiltersVisible ? 'Masquer les filtres' : 'Afficher les filtres' }}</span>
					</DSButtonOutline>

					<span class="text-sm text-gray-500 flex items-center">{{ filteredDocuments.length }} résultat(s) trouvé(s)</span>
				</div>

				<transition
					enter-active-class="transition duration-500 ease-out"
					enter-from-class="transform -translate-y-4 opacity-0"
					enter-to-class="transform translate-y-0 opacity-100"
					leave-active-class="transition duration-300 ease-in"
					leave-from-class="transform translate-y-0 opacity-100"
					leave-to-class="transform -translate-y-4 opacity-0"
				>
					<div
						v-show="isFiltersVisible"
						class="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-inner mb-4"
					>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
							<div class="filter-group">
								<DSLabel
									for="articleType"
									class="text-sm font-medium"
								>
									Type d'article
								</DSLabel>

								<DSSelect
									:items="articleTypes"
									:label="item => item"
									v-model="filters.articleType"
									class="w-full rounded-md border border-input bg-white px-3 py-2 hover:border-primary transition-colors duration-200"
									placeholder="Sélectionnez un type d'article"
								/>
							</div>

							<div class="filter-group opacity-50">
								<DSLabel class="text-sm font-medium">
									Date de publication
								</DSLabel>

								<div class="bg-white h-10 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
									<span class="text-xs text-gray-400">Filtre à venir</span>
								</div>
							</div>

							<div class="filter-group opacity-50">
								<DSLabel class="text-sm font-medium">
									Sexe
								</DSLabel>

								<div class="bg-white h-10 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
									<span class="text-xs text-gray-400">Filtre à venir</span>
								</div>
							</div>

							<div class="filter-group">
								<DSLabel class="text-sm font-medium">
									Espèces
								</DSLabel>

								<DSSelect
									:items="speciesOptions"
									:label="item => item"
									v-model="filters.species"
									class="w-full rounded-md border border-input bg-white px-3 py-2 hover:border-primary transition-colors duration-200"
									placeholder="Sélectionnez une espèce"
								/>
							</div>
						</div>

						<div class="flex items-center justify-between pt-3 border-t border-gray-200">
							<DSButtonPrimary
								@click="resetFilters"
								:disabled="!filters.articleType"
							>
								Réinitialiser les filtres
								<span class="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
							</DSButtonPrimary>
						</div>
					</div>
				</transition>
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
					:total="filteredDocuments.length"
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
					:total="filteredDocuments.length"
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
