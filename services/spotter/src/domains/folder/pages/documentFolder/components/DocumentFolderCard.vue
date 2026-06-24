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
	rename: [documentFolder: DocumentFolder];
}>();

function onClick() {
	emit("click", props.documentFolder);
}

function onDelete() {
	emit("delete", props.documentFolder);
}

function onRename() {
	emit("rename", props.documentFolder);
}
</script>

<template>
	<div
		class="group cursor-pointer"
		@click="onClick"
		:data-testid="`document-folder-card-${documentFolder.id}`"
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
						data-testid="document-folder-card-name"
					>
						{{ documentFolder.name }}
					</h3>
				</div>

				<DSDropdownMenu class="shrink-0">
					<DSDropdownMenuTrigger as-child>
						<DSButton
							variant="ghost"
							icon="dotsVertical"
							square
							@click.stop
							data-testid="document-folder-card-menu-button"
						/>
					</DSDropdownMenuTrigger>

					<DSDropdownMenuContent>
						<DSDropdownMenuItem
							@click="onRename"
							data-testid="document-folder-card-rename-button"
						>
							<DSIcon name="rename" />
							{{ $t("cta.rename") }}
						</DSDropdownMenuItem>

						<DSDropdownMenuItem
							@click="onDelete"
							data-testid="document-folder-card-delete-button"
						>
							<DSIcon name="delete" />
							{{ $t("cta.delete") }}
						</DSDropdownMenuItem>
					</DSDropdownMenuContent>
				</DSDropdownMenu>
			</div>

			<div
				class="p-2 bg-muted rounded-md border border-border"
				data-testid="document-folder-card-count"
			>
				{{ $t("documentFolderCard.items", documentFolder.numberOfDocument) }}
			</div>

			<span class="text-muted-foreground">{{ formatDate(documentFolder.createdAt ) }}</span>
		</DSCard>
	</div>
</template>
