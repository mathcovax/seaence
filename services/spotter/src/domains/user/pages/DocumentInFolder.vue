<script setup lang="ts">
import type { DocumentInFoloder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import DocumentInFolderItem from "../components/DocumentInFolderItem.vue";
import { useDocumentInFolderPage } from "../composables/useDocumentInFolderPage";
import DocumentFolderHeader from "../components/DocumentFolderHeader.vue";
import { createBakedDocumentId } from "@/utils/createBakedDocumentId";
import { useUserInformation } from "../composables/useUserInformation";

const router = useRouter();
const { $pt, params } = documentInFolderPage.use();
const {
	SearchDocumentInFolderForm,
	documentInFolderList,
	documentInFolderListDetails,
	documentInFolderPageInformation,
	handleSearchDocumentInFolder,
	documentInFolderPageOfList,
	documentInFolderSetPage,
	documentInFolderFindMany,
} = useDocumentInFolderPage(
	params.value.documentFolderId,
	() => {
		void router.back();
	},
);

const { userNavigatorLanguage } = useUserInformation();

const defaultdocumentinFolderIndex = 0;
const selectedDocumentinFolderIndex = ref(defaultdocumentinFolderIndex);

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

function handleRemoveDocumentInFolder(documentInFolder: DocumentInFoloder) {
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
			() => void documentInFolderFindMany(),
		)
		.whenRequestError(
			() => void router.back(),
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
					size="small"
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
					v-for="(item, index) in documentInFolderList"
					:key="item.nodeSameRawDocumentId"
					:document-in-folder="item"
					:is-selected="selectedDocumentinFolderIndex === index"
					@click="handleClickDocumentInFolder"
					@delete="handleRemoveDocumentInFolder"
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
	</section>
</template>
