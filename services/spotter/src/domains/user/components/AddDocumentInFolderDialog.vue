<script setup lang="ts">
import { useAddDocumentInFolderDialog } from "../composables/useAddDocumentInFolderDialog";

interface Props {
	nodeSameRawDocumentId: string;
}

const props = defineProps<Props>();

const {
	AddDocumentInFolderDialogForm,
	handleAddDocumentInFolder,
} = useAddDocumentInFolderDialog(props.nodeSameRawDocumentId);

</script>

<template>
	<DSDialog>
		<template #trigger>
			<slot />
		</template>

		<template #title>
			{{ $t("addDocumentInFolderDialog.title") }}
		</template>

		<template #content>
			<AddDocumentInFolderDialogForm @submit="handleAddDocumentInFolder">
				<DSPrimaryButton
					size="full"
					type="submit"
				>
					{{ $t("cta.add") }}
				</DSPrimaryButton>
			</AddDocumentInFolderDialogForm>
		</template>
	</DSDialog>
</template>
