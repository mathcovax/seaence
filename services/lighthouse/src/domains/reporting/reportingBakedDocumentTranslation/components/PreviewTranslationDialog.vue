<script setup lang="ts">
import type { BakedDocumentLanguage, CookingMode } from "@vendors/clients-type/bridge/duplojsTypesCodegen";
import { useGetNewBakedDocumentTranslation } from "../composables/useGetNewBakedDocumentTranslation";
import { reportingBakedDocumentTranslationPage } from "../router";
import PreviewDocument from "./PreviewDocument.vue";
import { useMakeNewBakedDocumentTranslation } from "../composables/useMakeNewBakedDocumentTranslation";
import { reportingBakedDocumentTranslationListPage } from "../../reportingBakedDocumentTranslationList/router";

interface Props {
	bakedDocumentId: string;
	nodeSameRawDocumentId: string;
	bakedDocumentLanguage: BakedDocumentLanguage;
	cookingMode: CookingMode;
}

const props = defineProps<Props>();

const { $pt } = reportingBakedDocumentTranslationPage.use();
const { getNewBakedDocumentTranslation, newBakedDocumentTranslation } = useGetNewBakedDocumentTranslation();
const { makeNewBakedDocumentTranslation } = useMakeNewBakedDocumentTranslation();
const router = useRouter();

const openModel = ref(false);

function onUpdateOpen(value: boolean) {
	if (!value) {
		getNewBakedDocumentTranslation.abortController?.abort();
		return;
	}
	newBakedDocumentTranslation.value = null;
}

function onSubmit() {
	openModel.value = false;
	void makeNewBakedDocumentTranslation(props)
		.whenInformation(
			"bakedDocument.makeNewTranslation",
			() => {
				void router.push(
					reportingBakedDocumentTranslationListPage.createTo({ query: {} }),
				);
			},
		);
}

function onOpenDialop() {
	void getNewBakedDocumentTranslation(props)
		.whenServerError(
			() => {
				openModel.value = false;
			},
		);
}

</script>

<template>
	<DSDialog
		size="normal"
		v-model:open="openModel"
		@update:open="onUpdateOpen"
	>
		<template #trigger>
			<DSPrimaryButton @click="onOpenDialop">
				{{ $pt("dialog.ctaTrigger") }}
			</DSPrimaryButton>
		</template>

		<template #content>
			<div
				v-if="newBakedDocumentTranslation"
				class="space-y-4"
			>
				<PreviewDocument
					:baked-document="newBakedDocumentTranslation"
				/>

				<DSPrimaryButton @click="onSubmit">
					{{ $pt("dialog.ctaSubmit") }}
				</DSPrimaryButton>
			</div>

			<div
				v-else
				class="flex justify-center items-center flex-col gap-4"
			>
				<DSAdminLoadingLogo />

				{{ $pt("dialog.loading") }}
			</div>
		</template>
	</DSDialog>
</template>
