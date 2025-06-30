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
}>();

function handleClick() {
	emit("click", props.documentInFolder);
}

function handleDelete() {
	emit("delete", props.documentInFolder);
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

		<div class="flex-grow">
			<h4 class="text-sm font-medium truncate">
				{{ documentInFolder.name }}
			</h4>
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

				<DSDropdownMenuContent @click.stop>
					<DSDropdownMenuItem @click.stop="handleDelete">
						<DSIcon name="delete" />
						{{ $t("cta.delete") }}
					</DSDropdownMenuItem>
				</DSDropdownMenuContent>
			</DSDropdownMenu>
		</div>
	</div>
</template>
