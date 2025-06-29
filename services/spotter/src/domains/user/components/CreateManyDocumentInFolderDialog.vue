<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useCreateManyDocumentInFolderDialog } from "../composables/useCreateManyDocumentInFolderDialog";

interface Props {
	nodeSameRawDocumentId: string;
}

const props = defineProps<Props>();
const router = useRouter();

function formattedDate(value: string | Date) {
	return new Intl.DateTimeFormat("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(value));
}

const {
	CreateManyDocumentInFolderDialogForm,
	handleCreateManyDocumentInFolder,
	pageOfListDocumentFoldersInWhichDocumentExist,
	documentFoldersInWhichDocumentExistList,
	documentFoldersInWhichDocumentExistListDetails,
	setPageDocumentFoldersInWhichDocumentExist,
	documentFolderDialogInformation,
} = useCreateManyDocumentInFolderDialog(props.nodeSameRawDocumentId);

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
	<DSDialog>
		<template #trigger>
			<slot />
		</template>

		<template #title>
			{{ $t("createManyDocumentInFolderDialog.title") }}
		</template>

		<template #content>
			<div
				class="space-y-1"
				v-if="documentFoldersInWhichDocumentExistList && documentFoldersInWhichDocumentExistListDetails"
			>
				<DSLabel>
					{{ $t("createManyDocumentInFolderDialog.sectionLabel") }}
				</DSLabel>

				<template
					v-for="(item, index) in documentFoldersInWhichDocumentExistList"
					:key="item.id"
				>
					<div
						class="flex items-center py-3 px-4 hover:bg-gray-50 rounded-md transition-colors cursor-pointer group"
						@click="handleClickDocumentFolder(item)"
					>
						<div class="flex-grow min-w-0">
							<h4 class="text-sm font-medium text-gray-900 truncate">
								{{ item.name }}
							</h4>
						</div>

						<div class="flex-shrink-0 ml-4 text-xs text-gray-500">
							{{ formattedDate(item.createdAt) }}
						</div>
					</div>

					<DSSelectSeparator v-if="index < documentFoldersInWhichDocumentExistList.length - 1" />
				</template>

				<div
					v-if="documentFoldersInWhichDocumentExistListDetails.total < documentFoldersInWhichDocumentExistList.length && documentFolderDialogInformation"
					class="mt-10 flex justify-center"
				>
					<DSPagination
						size="small"
						:total="documentFoldersInWhichDocumentExistListDetails.total"
						:current-page="pageOfListDocumentFoldersInWhichDocumentExist"
						:quantity-per-page="documentFolderDialogInformation.quantityPerPage"
						@update="setPageDocumentFoldersInWhichDocumentExist"
					/>
				</div>
			</div>

			<CreateManyDocumentInFolderDialogForm @submit="handleCreateManyDocumentInFolder">
				<DSPrimaryButton
					size="full"
					type="submit"
				>
					{{ $t("cta.add") }}
				</DSPrimaryButton>
			</CreateManyDocumentInFolderDialogForm>
		</template>
	</DSDialog>
</template>
