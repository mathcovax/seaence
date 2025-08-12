<script setup lang="ts">
import type { DocumentInFoloder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { formatDate } from "@vendors/design-system/lib/utils";

interface Props {
	documentInFolder: DocumentInFoloder;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	click: [document: DocumentInFoloder];
	delete: [document: DocumentInFoloder];
	rename: [document: DocumentInFoloder];
}>();

const { $pt } = documentInFolderPage.use();

function handleClick() {
	emit("click", props.documentInFolder);
}

function handleDelete() {
	emit("delete", props.documentInFolder);
}

function handleRename() {
	emit("rename", props.documentInFolder);
}

</script>

<template>
	<div
		class="group px-4 py-2 flex gap-4 items-center bg-muted/50 cursor-pointer hover:bg-muted rounded-md transition-colors"
		@click="handleClick"
	>
		<div class="shrink-0">
			<DSIcon
				name="fileOutline"
				class="text-muted-foreground"
			/>
		</div>

		<div class="flex-grow truncate">
			<p
				class="truncate"
				:title="documentInFolder.name"
			>
				{{ documentInFolder.name }}
			</p>

			<small
				v-if="documentInFolder.bakedDocumentTitle"
				class="truncate"
			>
				{{ $pt("bakedDocumentTitle", [documentInFolder.bakedDocumentTitle ?? $pt("missingBakedDocumentTitle")]) }}
			</small>
		</div>

		<div class="flex-shrink-0 text-xs text-muted-foreground/80">
			{{ formatDate(documentInFolder.addedAt) }}
		</div>

		<div class="shrink-0">
			<DSDropdownMenu>
				<DSDropdownMenuTrigger as-child>
					<DSButton
						variant="ghost"
						square
						icon="dotsVertical"
						@click.stop
					/>
				</DSDropdownMenuTrigger>

				<DSDropdownMenuContent>
					<DSDropdownMenuItem @click="handleRename">
						<DSIcon name="rename" />
						{{ $t("cta.rename") }}
					</DSDropdownMenuItem>

					<DSDropdownMenuItem @click="handleDelete">
						<DSIcon name="delete" />
						{{ $t("cta.delete") }}
					</DSDropdownMenuItem>
				</DSDropdownMenuContent>
			</DSDropdownMenu>
		</div>
	</div>
</template>
