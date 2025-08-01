<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { formatDate } from "@vendors/design-system/lib/utils";

interface Props {
	documentFolder: DocumentFolder;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	click: [documentFolder: DocumentFolder];
	delete: [documentFolder: DocumentFolder];
}>();

function onClick() {
	emit("click", props.documentFolder);
}

function onDelete() {
	emit("delete", props.documentFolder);
}

</script>

<template>
	<div
		class="group cursor-pointer"
		@click="onClick"
	>
		<DSCard
			class=" flex flex-col hover:shadow-md transition-shadow"
		>
			<div class="flex justify-between">
				<div class="min-w-0 flex-grow space-x-2 flex items-center">
					<DSIcon
						name="folderOutline"
						class="shrink-0"
					/>

					<h3
						class="font-medium truncate"
						:title="documentFolder.name"
					>
						{{ documentFolder.name }}
					</h3>
				</div>

				<DSDropdownMenu class="shrink-0">
					<DSDropdownMenuTrigger as-child>
						<DSButton
							data-testid="document-folder-card-button"
							variant="ghost"
							icon="dotsVertical"
							square
							@click.stop
						/>
					</DSDropdownMenuTrigger>

					<DSDropdownMenuContent @click.stop>
						<DSDropdownMenuItem
							data-testid="document-folder-card-button-dropdown-menu-delete-option"
							@click="onDelete"
						>
							<DSIcon name="delete" />
							{{ $t("cta.delete") }}
						</DSDropdownMenuItem>
					</DSDropdownMenuContent>
				</DSDropdownMenu>
			</div>

			<div class="p-2 bg-muted rounded-md border border-border">
				{{ $t("documentFolderCard.items", documentFolder.numberOfDocument) }}
			</div>

			<span class="text-muted-foreground">{{ formatDate(documentFolder.createdAt ) }}</span>
		</DSCard>

		<DeleteDialog />
	</div>
</template>
