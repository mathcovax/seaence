<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	documentFolder: DocumentFolder;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	click: [documentFolder: DocumentFolder];
	delete: [documentFolder: DocumentFolder];
}>();

const { t } = useI18n();

const { ValidationDialog: DeleteDialog, getValidation: getDeleteValidation } = useValidationDialog({
	title: t("removeDocumentFolderDialog.title"),
	description: t("removeDocumentFolderDialog.description"),
	acceptLabel: t("cta.validate"),
	rejectLabel: t("cta.refuse"),
});

const formattedDate = computed(
	() => new Intl.DateTimeFormat(
		"fr-FR",
		{
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		},
	).format(new Date(props.documentFolder.createdAt)),
);

function onClick() {
	emit("click", props.documentFolder);
}

async function onDelete() {
	if (!(await getDeleteValidation())) {
		return;
	}
	emit("delete", props.documentFolder);
}

</script>

<template>
	<div
		class="group cursor-pointer"
		@click="onClick"
	>
		<DSCard
			class="transition-all hover:shadow-md border border-gray-200 p-4 aspect-square flex flex-col w-full max-w-[180px] max-h-[180px]"
		>
			<div class="flex items-start justify-between">
				<div class="flex items-center space-x-2">
					<DSIcon name="folderOutline" />

					<h3 class="font-medium truncate">
						{{ documentFolder.name }}
					</h3>
				</div>

				<DSDropdownMenu>
					<DSDropdownMenuTrigger as-child>
						<DSButton
							variant="ghost"
							icon="dotsVertical"
							class="h-8 w-8"
							@click.stop
						/>
					</DSDropdownMenuTrigger>

					<DSDropdownMenuContent @click.stop>
						<DSDropdownMenuItem @click="onDelete">
							<DSIcon
								name="delete"
								class="h-4 w-4"
							/>
							{{ $t("cta.delete") }}
						</DSDropdownMenuItem>
					</DSDropdownMenuContent>
				</DSDropdownMenu>
			</div>

			<div class="mt-auto flex flex-col justify-center gap-4 pt-5">
				<div class="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
					{{ $t("documentFolderCard.items", documentFolder.numberOfDocument) }}
				</div>

				<span class="text-gray-500">{{ formattedDate }}</span>
			</div>
		</DSCard>

		<DeleteDialog />
	</div>
</template>
