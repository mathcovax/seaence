<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import DocumentFolderCard from "../components/DocumentFolderCard.vue";
import { useCreateDocumentFolderDialog } from "../composables/useCreateDocumentFolderDialog";
import { useCreateDocumentFolder } from "../composables/useCreateDocumentFolderForm";
import { useDocumentFolderPage } from "../composables/useDocumentFolderPage";
import DocumentFolderHeader from "../components/DocumentFolderHeader.vue";

const router = useRouter();
const { $pt } = documentFolderPage.use();
const {
	isOpenCreateDocumentFolderDialog,
	closeCreateDocumentFolderDialog,
	setStateCreateDocumentFolderDialog,
} = useCreateDocumentFolderDialog();
const { CreateDocumentFolderForm, createDocumentFolderCheck } = useCreateDocumentFolder();
const { sonnerWarning, sonnerMessage } = useSonner();
const {
	SearchDocumentFolderForm,
	documentFolderList,
	documentFolderPageInformation,
	handleSearchDocumentFolderByName,
	documentFolderSetPage,
	findManyDocumentFolder,
	documentFolderPageOfList,
} = useDocumentFolderPage(
	() => {
		void router.push(homePage.createTo());
	},
);

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
			"documentFolder.alreadyExists",
			() => sonnerWarning($pt("form.errors.documentFolder.alreadyExists")),
		)
		.whenInformation(
			"documentFolder.maxQuantity",
			() => sonnerWarning($pt("form.errors.documentFolder.maxQuantity")),
		)
		.whenInformation(
			"documentFolder.created",
			() => {
				closeCreateDocumentFolderDialog();
				void findManyDocumentFolder();
				sonnerMessage($pt("form.errors.documentFolder.created"));
			},
		);
}

function handleRemoveDocumentFolder(documentFolder: DocumentFolder) {
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
			"documentFolder.notfound",
			() => sonnerWarning($pt("form.errors.documentFolder.notfound")),
		)
		.whenInformation(
			"documentFolder.removed",
			() => {
				void findManyDocumentFolder();
				sonnerMessage($pt("form.errors.documentFolder.removed"));
			},
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
	<DSDialog
		:open="isOpenCreateDocumentFolderDialog"
		@update:open="setStateCreateDocumentFolderDialog"
	>
		<template #title>
			{{ $pt("dialog.createDocumentFolder.title") }}
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

	<main class="max-w-5xl mx-auto p-8">
		<header class="mb-6 flex justify-between items-center">
			<div class="flex gap-4 items-center">
				<DSPrimaryButton
					icon="arrowLeft"
					@click="router.back()"
				/>

				<h1 class="text-3xl font-semibold text-blue-seaence">
					{{ $pt("title") }}
				</h1>
			</div>

			<div class="flex gap-4">
				<DSOutlineButton
					icon="plus"
					@click="setStateCreateDocumentFolderDialog(true)"
				/>

				<SearchDocumentFolderForm @submit="handleSearchDocumentFolderByName">
					<DSPrimaryButton
						size="small"
						type="submit"
					>
						{{ $t("cta.search") }}
					</DSPrimaryButton>
				</SearchDocumentFolderForm>
			</div>
		</header>

		<section>
			<DocumentFolderHeader
				:label="$pt('header.label')"
				icon="folder"
				:count-total-item="documentFolderPageInformation?.total || 0"
				:count-filtered-item="documentFolderList?.total || 0"
			/>

			<div
				v-if="documentFolderList?.list?.length"
				class="mt-6"
			>
				<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
					<li
						v-for="folder in documentFolderList.list"
						:key="folder.id"
					>
						<DocumentFolderCard
							:document-folder="folder"
							@click="handleClickDocumentFolder"
							@delete="handleRemoveDocumentFolder"
						/>
					</li>
				</ul>

				<nav
					v-if="documentFolderPageInformation"
					class="mt-10 flex justify-center"
				>
					<DSPagination
						:total="documentFolderPageInformation.total"
						:current-page="documentFolderPageOfList"
						:quantity-per-page="documentFolderPageInformation.quantityPerPage"
						@update="documentFolderSetPage"
					/>
				</nav>
			</div>

			<p
				v-else
				class="text-center text-gray-500 mt-10 italic"
			>
				{{ $pt("noDocumentFolder") }}
			</p>
		</section>
	</main>
</template>
