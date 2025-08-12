<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useCreateManyDocumentInFolderDialog } from "./composables/useCreateManyDocumentInFolderDialog";
import { formatDate } from "@vendors/design-system/lib/utils";
import { useCreateDocumentFolderFormDialog } from "../../composables/useCreateDocumentFolderFormDialog";

interface Props {
	nodeSameRawDocumentId: string;
	currentDocumentTitle: string;
}

const props = defineProps<Props>();
const router = useRouter();

const {
	CreateManyDocumentInFolderDialogForm,
	pageOfListDocumentFoldersInWhichDocumentExist,
	documentFoldersInWhichDocumentExistList,
	documentFoldersInWhichDocumentExistListDetails,
	setPageDocumentFoldersInWhichDocumentExist,
	handleCreateManyDocumentInFolder,
	documentFolderDialogInformation,
	initDialog,
} = useCreateManyDocumentInFolderDialog(
	props.nodeSameRawDocumentId,
	props.currentDocumentTitle,
);
const { CreateFormDialog, createDocumentFolder } = useCreateDocumentFolderFormDialog();

function handleClickDocumentFolder(documentFolder: DocumentFolder) {
	return router.push(documentInFolderPage.createTo(
		{
			params: {
				documentFolderId: documentFolder.id,
			},
		},
	));
}

function onUpdateOpen(value: boolean) {
	if (value) {
		void initDialog();
	}
}

</script>

<template>
	<DSDialog @update:open="onUpdateOpen">
		<template #trigger>
			<slot />
		</template>

		<template #title>
			{{ $t("createManyDocumentInFolderDialog.title") }}
		</template>

		<template #content>
			<DSOpenTansition
				class="duration-1000"
				imediate-enter
			>
				<div class="w-full">
					<div
						class="space-y-1"
						v-if="documentFoldersInWhichDocumentExistList && documentFoldersInWhichDocumentExistListDetails?.total"
					>
						<DSLabel>
							{{ $t("createManyDocumentInFolderDialog.sectionLabel") }}
						</DSLabel>

						<ul
							v-for="item in documentFoldersInWhichDocumentExistList"
							:key="item.id"
							class="space-y-2"
						>
							<li
								class="p-4 flex gap-2 items-center bg-muted/50 hover:bg-muted rounded-md cursor-pointer transition-colors"
								@click="handleClickDocumentFolder(item)"
							>
								<div class="shrink-0">
									<DSIcon
										name="folderOutline"
										class="text-muted-foreground"
									/>
								</div>

								<div class="flex-grow">
									<h4 class="text-sm font-medium truncate">
										{{ item.name }}
									</h4>
								</div>

								<div class="flex-shrink-0 ml-4 text-xs text-muted-foreground">
									{{ formatDate(item.createdAt) }}
								</div>
							</li>
						</ul>

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

					<DSLabel v-else-if="documentFoldersInWhichDocumentExistListDetails?.total === 0">
						{{ $t("createManyDocumentInFolderDialog.noParentFolder") }}
					</DSLabel>
				</div>
			</DSOpenTansition>

			<CreateManyDocumentInFolderDialogForm @submit="handleCreateManyDocumentInFolder">
				<DSPrimaryButton
					size="full"
					type="submit"
				>
					{{ $t("cta.add") }}
				</DSPrimaryButton>
			</CreateManyDocumentInFolderDialogForm>

			<DSOutlineButton @click="createDocumentFolder">
				{{ $t("createManyDocumentInFolderDialog.createDocumentFolder") }}
			</DSOutlineButton>

			<CreateFormDialog />
		</template>
	</DSDialog>
</template>
