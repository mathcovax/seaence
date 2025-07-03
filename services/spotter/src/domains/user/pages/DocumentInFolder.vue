<script setup lang="ts">
import type { DocumentInFoloder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import DocumentInFolderItem from "../components/DocumentInFolderItem.vue";
import DocumentInFolderSeparatorItem from "../components/DocumentInFolderSeparatorItem.vue";
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
		class="max-w-5xl mx-auto p-8"
	>
		<header class="flex justify-between items-center mb-6">
			<div class="flex items-center gap-4">
				<DSPrimaryButton
					icon="arrowLeft"
					@click="router.back()"
				/>

				<h1 class="text-3xl font-semibold text-blue-seaence">
					{{ $pt("title") }} : {{ documentInFolderPageInformation?.documentFolderName }}
				</h1>
			</div>

			<SearchDocumentInFolderForm @submit="handleSearchDocumentInFolder">
				<DSPrimaryButton
					size="small"
					type="submit"
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
			<div class="space-y-1">
				<template
					v-for="(item, index) in documentInFolderList"
					:key="item.nodeSameRawDocumentId"
				>
					<DocumentInFolderItem
						:document-in-folder="item"
						:is-selected="selectedDocumentinFolderIndex === index"
						@click="handleClickDocumentInFolder"
						@delete="handleRemoveDocumentInFolder"
					/>

					<DocumentInFolderSeparatorItem v-if="index < documentInFolderList.length - 1" />
				</template>

				<div class="mt-10 flex justify-center">
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
			class="text-center text-gray-500 italic mt-8"
		>
			{{ $pt("noDocumentInFolder") }}
		</p>
	</section>
</template>
