<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { useReportingWrongTranslateForm } from "../composables/useReportingWrongTranslateForm";

interface Props {
	bakedDocumentId: string;
}

const props = defineProps<Props>();

const { isConnected } = useUserInformation();
const { $pt } = documentPage.use();
const {
	ReportingWrongTranslateForm,
	checkReportingWrongTranslateForm,
	resetReportingWrongTranslateForm,
} = useReportingWrongTranslateForm();
const { sonnerError } = useSonner();

const dialogIsOpen = ref(false);

function submit() {
	const result = checkReportingWrongTranslateForm();

	if (!result) {
		return;
	} else if (!isConnected.value) {
		sonnerError($pt("reportingWrongTranslate.connexionRequire"));
		return;
	}

	void horizonClient
		.post(
			"/upsert-baked-document-translation-reporting",
			{
				body: {
					bakedDocumentId: props.bakedDocumentId,
					reportingDetails: result.reportingDetails,
				},
			},
		)
		.whenInformation(
			"bakedDocumentTranslationReporting.upsert",
			() => {
				resetReportingWrongTranslateForm();
				dialogIsOpen.value = false;
			},
		);
}

watch(
	dialogIsOpen,
	resetReportingWrongTranslateForm,
);
</script>

<template>
	<DSDialog v-model:open="dialogIsOpen">
		<template #title>
			{{ $pt("reportingWrongTranslate.cta") }}
		</template>

		<template #description>
			{{ $pt("reportingWrongTranslate.information") }}
		</template>

		<template #content>
			<ReportingWrongTranslateForm @submit="submit">
				<DSPrimaryButton type="submit">
					{{ $t("cta.send") }}
				</DSPrimaryButton>
			</ReportingWrongTranslateForm>
		</template>

		<template #trigger>
			<slot />
		</template>
	</DSDialog>
</template>
