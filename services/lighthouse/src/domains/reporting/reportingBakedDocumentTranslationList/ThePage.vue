<script setup lang="ts">
import { reportingBakedDocumentTranslationPage } from "../reportingBakedDocumentTranslation/router";
import { useList } from "./composables/useList";
import { usePage } from "./composables/usePage";
import { reportingBakedDocumentTranslationListPage } from "./router";

const { $pt } = reportingBakedDocumentTranslationListPage.use();
const { pageContent } = usePage();
const { list, pageOfList } = useList();

</script>

<template>
	<div
		v-if="pageContent && list"
		class="flex flex-col gap-2 p-2"
	>
		<DSPagination
			v-model:current-page="pageOfList"
			:quantity-per-page="pageContent.quantityPerPage"
			:total="pageContent.countTotal"
		/>

		<p>{{ $pt("reportingDocument", [pageContent.countTotal]) }}</p>

		<div class="flex flex-col gap-3">
			<RouterLink
				v-for="row of list"
				:key="row.bakedDocumentId"
				:to="
					reportingBakedDocumentTranslationPage
						.createTo({
							params: {bakedDocumentId: row.bakedDocumentId},
							query: {}
						})
				"
			>
				<DSCard class="flex flex-col gap-2 p-2">
					<p>
						<strong>{{ $pt("bakedDocumentId") }}</strong>
						{{ row.bakedDocumentId }}
					</p>

					<p>
						<strong>{{ $pt("title") }}</strong>
						{{ row.bakedDocumentTitle }}
					</p>

					<p>
						<strong>{{ $pt("reporting") }}</strong>
						{{ row.reportingQuantity }}
					</p>
				</DSCard>
			</RouterLink>
		</div>

		<DSPagination
			v-model:current-page="pageOfList"
			:quantity-per-page="pageContent.quantityPerPage"
			:total="pageContent.countTotal"
		/>
	</div>
</template>
