<script setup lang="ts">
import DocumentInFolderItem from "../components/DocumentInFolderItem.vue";
import { useDocumentInFolderPage } from "../composables/useDocumentInFolderPage";
import DocumentFolderHeader from "../components/DocumentFolderHeader.vue";
import { createBakedDocumentId } from "@/utils/createBakedDocumentId";
import { useUserInformation } from "../composables/useUserInformation";
import type { DocumentInFoloder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

const router = useRouter();
const { $pt, params } = documentInFolderPage.use();
const { t } = useI18n();
const {
	SearchDocumentInFolderForm,
	documentInFolderList,
	documentInFolderListDetails,
	documentInFolderPageInformation,
	handleSearchDocumentInFolder,
	documentInFolderPageOfList,
	documentInFolderSetPage,
	initDocumentInFolderPage,
} = useDocumentInFolderPage(
	params.value.documentFolderId,
	() => {
		void router.back();
	},
);

const { userNavigatorLanguage } = useUserInformation();

const { ValidationDialog: DeleteDialog, getValidation: getDeleteValidation } = useValidationDialog({
	title: t("removeDocumentInFolderDialog.title"),
	description: t("removeDocumentInFolderDialog.description"),
	acceptLabel: t("cta.validate"),
	rejectLabel: t("cta.refuse"),
	destructive: true,
});

const renameDialogOpen = ref(false);
const documentInFolderToRename = ref<DocumentInFoloder | null>(null);
const minLength = 1;
const maxLength = 100;

const { Form: RenameForm, check: checkRename, reset: resetRename } = useFormBuilder(
	useMultiFieldLayout({
		newName: useBaseLayout(
			textFormField,
			{
				mandatory: true,
				defaultValue: "",
				schema: zod.string()
					.min(minLength, t("formMessage.required"))
					.max(maxLength, t("formMessage.maxLength", { value: maxLength })),
			},
		),
	}),
);

function handleClickDocumentInFolder({ nodeSameRawDocumentId }: DocumentInFoloder) {
	void router.push(documentPage.createTo(
		{
			params: {
				id: createBakedDocumentId({
					nodeSameRawDocumentId,
					bakedDocumentLanguage: userNavigatorLanguage.value,
				}),
			},
		},
	));
}

async function handleRemoveDocumentInFolder(documentInFolder: DocumentInFoloder) {
	if (!(await getDeleteValidation())) {
		return;
	}

	return horizonClient
		.post(
			"/remove-document-in-folder",
			{
				body: {
					documentFolderId: documentInFolder.documentFolderId,
					nodeSameRawDocumentId: documentInFolder.nodeSameRawDocumentId,
				},
			},
		)
		.whenInformation(
			"documentInFolder.removed",
			() => {
				initDocumentInFolderPage();
			},
		)
		.whenRequestError(
			() => void router.back(),
		);
}

function handleRenameDocumentInFolder(documentInFolder: DocumentInFoloder) {
	documentInFolderToRename.value = documentInFolder;
	resetRename();
	renameDialogOpen.value = true;
}

async function handleRenameSubmit() {
	const result = checkRename();

	if (!result || !documentInFolderToRename.value) {
		return;
	}

	return horizonClient
		.post(
			"/rename-document-in-folder",
			{
				body: {
					documentFolderId: documentInFolderToRename.value.documentFolderId,
					nodeSameRawDocumentId: documentInFolderToRename.value.nodeSameRawDocumentId,
					newDocumentInFolderName: result.newName,
				},
			},
		)
		.whenInformation(
			"documentInFolder.renamed",
			() => {
				renameDialogOpen.value = false;
				initDocumentInFolderPage();
			},
		);
}

</script>

<template>
	<section
		v-if="documentInFolderPageInformation && documentInFolderListDetails"
		class="min-h-screen-nh space-y-6"
	>
		<header class="flex justify-between items-start">
			<div class="flex-1/2 sm:flex-none flex flex-col sm:flex-row gap-4 items-start sm:items-center">
				<BackButton />

				<h1 class="text-xl md:text-3xl font-bold text-blue-seaence">
					{{ $pt("title") }} : {{ documentInFolderPageInformation?.documentFolderName }}
				</h1>
			</div>

			<SearchDocumentInFolderForm
				class="flex-1/2 sm:flex-none"
				@submit="handleSearchDocumentInFolder"
			>
				<DSPrimaryButton
					type="submit"
					class="ml-auto"
				>
					{{ $t("cta.search") }}
				</DSPrimaryButton>
			</SearchDocumentInFolderForm>
		</header>

		<DocumentFolderHeader
			icon="file"
			:count-total-item="documentInFolderPageInformation.total"
			:count-filtered-item="documentInFolderListDetails.total"
		/>

		<template v-if="documentInFolderList?.length">
			<div class="space-y-2">
				<DocumentInFolderItem
					v-for="item in documentInFolderList"
					:key="item.nodeSameRawDocumentId"
					:document-in-folder="item"
					@click="handleClickDocumentInFolder"
					@delete="handleRemoveDocumentInFolder"
					@rename="handleRenameDocumentInFolder"
				/>

				<div
					class="mt-10 flex justify-center"
					v-if="documentInFolderListDetails.total > documentInFolderPageInformation.quantityPerPage"
				>
					<DSPagination
						:total="documentInFolderListDetails.total"
						:current-page="documentInFolderPageOfList"
						:quantity-per-page="documentInFolderPageInformation.quantityPerPage"
						@update="documentInFolderSetPage"
					/>
				</div>
			</div>
		</template>

		<p
			v-else
			class="mt-10 text-center text-muted-foreground italic"
		>
			{{ $pt("noDocumentInFolder") }}
		</p>

		<DeleteDialog />

		<DSDialog v-model:open="renameDialogOpen">
			<template #title>
				{{ $t("renameDocumentInFolderDialog.title") }}
			</template>

			<template #content>
				<RenameForm
					class="flex flex-col gap-4"
					@submit="handleRenameSubmit"
				>
					<template #newName="{ field }">
						<DSField v-bind="field">
							<template #label>
								{{ $t('documentInFolderForm.name') }}
							</template>
						</DSField>
					</template>

					<div class="flex gap-2 justify-end">
						<DSOutlineButton
							type="button"
							@click="renameDialogOpen = false"
						>
							{{ $t("cta.cancel") }}
						</DSOutlineButton>

						<DSPrimaryButton type="submit">
							{{ $t("cta.rename") }}
						</DSPrimaryButton>
					</div>
				</RenameForm>
			</template>
		</DSDialog>
	</section>
</template>
