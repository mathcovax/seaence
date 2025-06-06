<script setup lang="ts">
import type { ReportingBakedDocumentTranslationPage } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { reportingBakedDocumentTranslationPage } from "../router";
import type { PartialKeys } from "@duplojs/utils";

interface Props {
	bakedDocument: PartialKeys<
		ReportingBakedDocumentTranslationPage["bakedDocument"],
		| "id"
		| "nodeSameRawDocumentId"
		| "language"
	>;
}

defineProps<Props>();
const { $pt } = reportingBakedDocumentTranslationPage.use();
</script>

<template>
	<div class="flex flex-col gap-2">
		<p v-if="bakedDocument.id">
			<strong>{{ $pt("bakedDocument.id") }}</strong> {{ bakedDocument.id }}
		</p>

		<p v-if="bakedDocument.nodeSameRawDocumentId">
			<strong>{{ $pt("bakedDocument.nodeId") }}</strong> {{ bakedDocument.nodeSameRawDocumentId }}
		</p>

		<p v-if="bakedDocument.language">
			<strong>{{ $pt("bakedDocument.language") }}</strong> {{ bakedDocument.language }}
		</p>

		<p><strong>{{ $pt("bakedDocument.title") }}</strong> {{ bakedDocument.title }}</p>

		<p><strong>{{ $pt("bakedDocument.keyword") }}</strong> {{ bakedDocument.keywords.join(", ") }}</p>

		<p v-if="bakedDocument.abstract !== null">
			<strong>{{ $pt("bakedDocument.abstract") }}</strong>
			{{ bakedDocument.abstract }}
		</p>

		<div v-if="bakedDocument.abstractDetails !== null">
			<strong>{{ $pt("bakedDocument.abstractDetails") }}</strong>

			<ul>
				<li
					v-for="row of bakedDocument.abstractDetails"
					:key="row.name"
				>
					<strong>{{ row.label }}</strong>:
					{{ row.content }}
				</li>
			</ul>
		</div>
	</div>
</template>
