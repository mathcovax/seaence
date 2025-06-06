<script setup lang="ts">
import PreviewDocument from "./components/PreviewDocument.vue";
import PreviewTranslationDialog from "./components/PreviewTranslationDialog.vue";
import { useList } from "./composables/useList";
import { usePage } from "./composables/usePage";
import { reportingBakedDocumentTranslationPage } from "./router";

const { $pt } = reportingBakedDocumentTranslationPage.use();
const { pageContent } = usePage();
const { list, pageOfList } = useList();
</script>

<template>
	<div
		class="flex gap-2 p-2"
		v-if="pageContent && list"
	>
		<div class="space-y-2 w-7/10 overflow-auto max-h-full">
			<PreviewTranslationDialog
				:baked-document-id="pageContent.bakedDocument.id"
				:node-same-raw-document-id="pageContent.bakedDocument.nodeSameRawDocumentId"
				:baked-document-language="pageContent.bakedDocument.language"
			/>

			<PreviewDocument :baked-document="pageContent.bakedDocument" />
		</div>

		<ul class="flex flex-col w-3/10 gap-2">
			{{ $pt("reporting.quantity", [pageContent.reporting.countTotal]) }}

			<DSPagination
				:current-page="pageOfList"
				:quantity-per-page="pageContent.reporting.quantityPerPage"
				:total="pageContent.reporting.countTotal"
			/>

			<li
				v-for="row of list"
				:key="row.id"
				class="flex flex-col gap-2"
			>
				<p>
					<strong>{{ $pt("reporting.id") }}</strong>
					{{ row.id }}
				</p>

				<p>
					<strong>{{ $pt("reporting.userId") }}</strong>
					{{ row.userId }}
				</p>

				<p>
					<strong>{{ $pt("reporting.details") }}</strong>
					{{ row.details }}
				</p>
			</li>
		</ul>
	</div>
</template>
