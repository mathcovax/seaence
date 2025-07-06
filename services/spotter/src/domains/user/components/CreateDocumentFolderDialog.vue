<script setup lang="ts">
import { useCreateDocumentFolder } from "../composables/useCreateDocumentFolderForm";

const emit = defineEmits<{
	createDocumentFolder: [];
}>();

const dialogState = ref<boolean>(false);

const { CreateDocumentFolderForm, createDocumentFolderCheck, createDocumentFolderReset } = useCreateDocumentFolder();

function handleCreateDocumentFolder() {
	const result = createDocumentFolderCheck();

	if (!result) {
		return;
	}

	return horizonClient
		.post(
			"/create-document-folder",
			{
				body: {
					documentFolderName: result.name,
				},
			},
		)
		.whenInformation(
			"documentFolder.created",
			() => {
				dialogState.value = false;
				emit("createDocumentFolder");
				createDocumentFolderReset();
			},
		);
}

</script>

<template>
	<DSDialog
		v-model:open="dialogState"
	>
		<template #trigger>
			<slot />
		</template>

		<template #title>
			{{ $t("createDocumentFolderDialog.title") }}
		</template>

		<template #content>
			<CreateDocumentFolderForm @submit="handleCreateDocumentFolder">
				<DSPrimaryButton
					size="full"
					type="submit"
				>
					{{ $t("cta.create") }}
				</DSPrimaryButton>
			</CreateDocumentFolderForm>
		</template>
	</DSDialog>
</template>
