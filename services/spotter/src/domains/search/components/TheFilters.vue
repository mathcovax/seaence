<script setup lang="ts">
import type { Facet } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	facets?: Facet[];
}

defineProps<Props>();
</script>

<template>
	<div
		class="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-inner"
	>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
			<div class="filter-group">
				<DSLabel
					for="articleType"
					class="text-sm font-medium"
				>
					{{ $t("search.filters.label.articleType") }}
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
					{{ $t("search.filters.label.publicationYear") }}
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
					{{ $t("search.filters.label.gender") }}
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

		<div class="flex flex-col-reverse md:flex-row gap-2 md:items-center justify-between pt-3 border-t border-gray-200">
			<DSButtonPrimary
				@click="applyFilters"
				:disabled="
					!filters.articleType &&
						filters.gender.length === 0"
			>
				{{ $t("search.filters.apply") }}
			</DSButtonPrimary>

			<DSButtonOutline
				@click="resetFilters"
				:disabled="
					!filters.articleType && filters.gender.length === 0
				"
			>
				{{ $t("search.filters.reset") }}
			</DSButtonOutline>
		</div>
	</div>
</template>
