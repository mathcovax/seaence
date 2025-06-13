<script setup lang="ts">
import DialogCreateDocumentFolder from "../components/DialogCreateDocumentFolder.vue";
import DocumentFolderCard from "../components/DocumentFolderCard.vue";
import { useCreateDocumentFolderDialog } from "../composables/useCreateDocumentFolderDialog";
import { useCreateDocumentFolder } from "../composables/useCreateDocumentFolderForm";
import { useDocumentFolderPage } from "../composables/useDocumentFolderPage";

const router = useRouter();
const { $pt } = documentFolderPage.use();
const { isOpen, close, setState } = useCreateDocumentFolderDialog();
const { CreateDocumentFolderForm, createDocumentFolderCheck } = useCreateDocumentFolder();
const { sonnerWarning, sonnerMessage } = useSonner();
const {
	SearchDocumentFolderForm,
	documentFolderList,
	documentFolderPageInformation,
	findDocumentFolder,
} = useDocumentFolderPage(
	() => {
		router.back();
	},
);

function createDocumentFolder() {
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
				close();
				sonnerMessage($pt("form.errors.documentFolder.created"));
			},
		);
}

</script>

<template>
	<DialogCreateDocumentFolder
		:open="isOpen"
		@update:open="setState"
	>
		<CreateDocumentFolderForm @submit="createDocumentFolder">
			<DSPrimaryButton
				size="full"
				type="submit"
			>
				{{ $t("cta.create") }}
			</DSPrimaryButton>
		</CreateDocumentFolderForm>
	</DialogCreateDocumentFolder>

	<section class="max-w-5xl mx-auto px-4 py-8">
		<div class="flex flex-col gap-6">
			<div class="mb-6 flex justify-between items-center">
				<div class="flex gap-4 items-center">
					<DSPrimaryButton
						icon="arrowLeft"
						@click="router.back()"
					/>

					<h1 class="text-3xl font-semibold text-blue-seaence">
						{{ $pt("title") }}
					</h1>
				</div>

				<div class="gap-4 flex flex-row">
					<SearchDocumentFolderForm @submit="findDocumentFolder">
						<DSPrimaryButton
							size="small"
							type="submit"
						>
							{{ $t("cta.search") }}
						</DSPrimaryButton>
					</SearchDocumentFolderForm>

					<DSOutlineButton
						icon="plus"
						@click="setState(true)"
					/>
				</div>
			</div>

			<div>
				<div class="bg-gradient-to-r from-blue-50 to-gray-100 rounded-lg p-5 mb-6 border border-gray-200 shadow-sm">
					<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<div class="bg-blue-seaence rounded-full p-2.5 shadow-sm">
								<DSIcon
									name="folder"
									class="w-6 h-6 text-white"
								/>
							</div>

							<div class="flex flex-row items-center justify-center gap-2">
								<span class="text-2xl font-semibold text-gray-800">
									{{ documentFolderList ?
										documentFolderList.total :
										documentFolderPageInformation?.total || 0
									}}
								</span>

								<span class="text-md text-gray-600">
									{{ $pt('counter.label') }}
								</span>
							</div>
						</div>

						<div
							v-if="documentFolderList && documentFolderPageInformation"
							class="bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-seaence border border-blue-100 shadow-sm flex items-center gap-2"
						>
							<span>{{ $pt('counter.filtered', {
								filtered: documentFolderList.total,
								total: documentFolderPageInformation.total
							}) }}</span>
						</div>
					</div>
				</div>

				<div class="space-y-6">
					<div>
						<DocumentFolderCard
							:document-folder="{
								id: 'z',
								userId: 'rerer',
								numberOfDocument: 10,
								name:'test',
								createdAt: '1995-12-17T03:24:00'
							}"
							@click="console.log('click')"
							@delete="console.log('delete')"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
