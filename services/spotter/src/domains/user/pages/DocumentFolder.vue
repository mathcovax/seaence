<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import DocumentFolderCard from "../components/DocumentFolderCard.vue";
import { useDocumentFolderPage } from "../composables/useDocumentFolderPage";
import DocumentFolderHeader from "../components/DocumentFolderHeader.vue";
import CreateDocumentFolderDialog from "../components/CreateDocumentFolderDialog.vue";

const router = useRouter();
const { $pt } = documentFolderPage.use();
const { t } = useI18n();

const {
	SearchDocumentFolderForm,
	documentFolderList,
	documentFolderListDetails,
	documentFolderPageInformation,
	handleSearchDocumentFolderByName,
	documentFolderSetPage,
	documentFolderPageOfList,
	findDocumentFolderPage,
} = useDocumentFolderPage(
	() => {
		void router.push(homePage.createTo());
	},
);

const { ValidationDialog: DeleteDialog, getValidation: getDeleteValidation } = useValidationDialog({
	title: t("removeDocumentFolderDialog.title"),
	description: t("removeDocumentFolderDialog.description"),
	acceptLabel: t("cta.validate"),
	rejectLabel: t("cta.refuse"),
	destructive: true,
});

async function handleRemoveDocumentFolder(documentFolder: DocumentFolder) {
	if (!(await getDeleteValidation())) {
		return;
	}

	return horizonClient
		.post(
			"/remove-document-folder",
			{
				body: {
					documentFolderId: documentFolder.id,
				},
			},
		)
		.whenInformation(
			"documentFolder.removed",
			() => void findDocumentFolderPage(),
		);
}

function handleClickDocumentFolder(documentFolder: DocumentFolder) {
	return router.push(documentInFolderPage.createTo(
		{
			params: {
				documentFolderId: documentFolder.id,
			},
		},
	));
}

</script>

<template>
	<section class="min-h-screen-nh space-y-6">
		<header class="flex justify-between items-start">
			<div class="flex-1/2 sm:flex-none flex flex-col sm:flex-row gap-4 items-start sm:items-center">
				<BackButton />

				<h1 class="text-xl md:text-3xl font-bold text-blue-seaence">
					{{ $pt("title") }}
				</h1>
			</div>

			<div class="flex gap-4">
				<SearchDocumentFolderForm
					class="flex-1/2 sm:flex-none"
					@submit="handleSearchDocumentFolderByName"
				>
					<div class="ml-auto flex gap-2 justify-end items-center">
						<CreateDocumentFolderDialog @create-document-folder="findDocumentFolderPage()">
							<DSOutlineButton
								icon="plus"
							/>
						</CreateDocumentFolderDialog>

						<DSPrimaryButton type="submit">
							{{ $t("cta.search") }}
						</DSPrimaryButton>
					</div>
				</SearchDocumentFolderForm>
			</div>
		</header>

		<div v-if="documentFolderPageInformation && documentFolderListDetails">
			<DocumentFolderHeader
				icon="folder"
				:count-total-item="documentFolderPageInformation.total"
				:count-filtered-item="documentFolderListDetails.total"
			/>

			<div
				v-if="documentFolderList"
				class="mt-4 md:mt-6"
			>
				<ul class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
					<li
						v-for="folder in documentFolderList"
						:key="folder.id"
					>
						<DocumentFolderCard
							:document-folder="folder"
							@click="handleClickDocumentFolder"
							@delete="handleRemoveDocumentFolder"
						/>
					</li>
				</ul>

				<div
					v-if="documentFolderListDetails.total > documentFolderPageInformation.quantityPerPage"
					class="mt-10 flex justify-center"
				>
					<DSPagination
						:total="documentFolderListDetails.total"
						:current-page="documentFolderPageOfList"
						:quantity-per-page="documentFolderPageInformation.quantityPerPage"
						@update="documentFolderSetPage"
					/>
				</div>
			</div>

			<p
				v-else
				class="mt-10 text-center text-muted-foreground italic"
			>
				{{ $pt("noDocumentFolder") }}
			</p>
		</div>

		<DeleteDialog />
	</section>
</template>
