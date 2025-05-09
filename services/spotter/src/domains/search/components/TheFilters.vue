<script setup lang="ts">
interface Props {
	isFiltersVisible: boolean;
}
interface Filters {
	articleType: string;
	gender: string[];
	publicationYear: {
		from: number;
		to: number;
	};
}

defineProps<Props>();

const articleTypes = ["Article scientifique", "Étude clinique", "Revue", "Méta-analyse", "Rapport de cas"];
const filtersYear = {
	min: 1800,
	max: 2025,
};
const genderOptions = [
	{
		id: "male",
		label: "Homme",
	},
	{
		id: "female",
		label: "Femme",
	},
];
const filters = ref<Filters>({
	articleType: "",
	gender: [],
	publicationYear: {
		from: filtersYear.min,
		to: filtersYear.max,
	},
});

const notFound = -1;
const removeOne = 1;
function toggleGender(id: string) {
	const index = filters.value.gender.indexOf(id);
	if (index === notFound) {
		filters.value.gender.push(id);
	} else {
		filters.value.gender.splice(index, removeOne);
	}
}
function applyFilters() {
	const filtersApplied = {
		articleType: filters.value.articleType,
		gender: filters.value.gender,
		publicationYear: filters.value.publicationYear,
	};
	console.log("Filters applied:", filtersApplied);
}

function resetFilters() {
	filters.value = {
		articleType: "",
		gender: [],
		publicationYear: {
			from: filtersYear.min,
			to: filtersYear.max,
		},
	};
}

watch(
	() => filters.value,
	(newFilters) => {
		console.log("Filters updated:", newFilters);
	},
	{ deep: true },
);
</script>

<template>
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
						{{ $t("filters.label.articleType") }}
					</DSLabel>

					<DSSelect
						:items="articleTypes"
						:label="item => item"
						v-model="filters.articleType"
						class="w-full rounded-md border border-input bg-white px-3 py-2 hover:border-primary transition-colors duration-200"
						placeholder="Sélectionnez un type d'article"
					/>
				</div>

				<div class="filter-group">
					<DSLabel class="text-sm font-medium">
						{{ $t("filters.label.publicationYear") }}
					</DSLabel>

					<DSRange
						name="publicationYear"
						:min="filtersYear.min"
						:max="filtersYear.max"
						v-model="filters.publicationYear"
					/>
				</div>

				<div class="filter-group">
					<DSLabel class="text-sm font-medium">
						{{ $t("filters.label.gender") }}
					</DSLabel>

					<div
						class="flex flex-col gap-2"
						:key="filters.gender.join(',')"
					>
						<div
							v-for="option in genderOptions"
							:key="option.id"
							class="flex gap-2 items-center"
						>
							<DSCheckbox
								:id="option.id"
								:model-value="filters.gender.includes(option.id)"
								@update:model-value="toggleGender(option.id)"
							/>

							<DSLabel
								:for="option.id"
								class="font-normal"
							>
								{{ option.label }}
							</DSLabel>
						</div>
					</div>
				</div>
			</div>

			<div class="flex items-center justify-between pt-3 border-t border-gray-200">
				<DSButtonPrimary
					@click="applyFilters"
					:disabled="
						!filters.articleType &&
							filters.gender.length === 0"
				>
					{{ $t("filters.apply") }}
				</DSButtonPrimary>

				<DSButtonOutline
					@click="resetFilters"
					:disabled="
						!filters.articleType && filters.gender.length === 0
					"
				>
					{{ $t("filters.reset") }}
				</DSButtonOutline>
			</div>
		</div>
	</transition>
</template>
