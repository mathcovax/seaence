<script setup lang="ts">
import { reportingBakedDocumentTranslationPage } from "../reportingBakedDocumentTranslation/router";
import { useList } from "./composables/useList";
import { usePage } from "./composables/usePage";

const { pageInformation } = usePage();
const { list, pageOfList } = useList();

</script>

<template>
	<div v-if="pageInformation && list">
		<DSPagination
			v-model:current-page="pageOfList"
			:quantity-per-page="pageInformation.quantityPerPage"
			:total="pageInformation.countTotal"
		/>

		<div class="flex flex-col gap-3">
			<RouterLink
				v-for="row of list"
				:key="row.bakedDocumentId"
				:to="
					reportingBakedDocumentTranslationPage
						.createTo({params: {bakedDocumentId: row.bakedDocumentId}})
				"
			>
				<DSCard class="flex flex-col gap-2 p-2">
					<p>{{ row.bakedDocumentId }}</p>

					<p>{{ row.bakedDocumentTitle }}</p>

					<p>{{ row.reportingQuantity }}</p>
				</DSCard>
			</RouterLink>
		</div>
	</div>
</template>
