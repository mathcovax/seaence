<script setup lang="ts">
import type { DocumentFolder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useRemoveDocumentFolderDialog } from "../composables/useRemoveDocumentFolderDialog";

interface Props {
	documentFolder: DocumentFolder;
	size?: "small" | "default" | "large";
}

const {
	isOpenRemoveDocumentFolderDialog,
	setStateRemoveDocumentFolderDialog,
} = useRemoveDocumentFolderDialog();

const props = withDefaults(defineProps<Props>(), {
	size: "default",
});

// eslint-disable-next-line @stylistic/js/function-call-spacing
const emit = defineEmits<{
	(event: "click", documentFolder: DocumentFolder): void;
	(event: "delete", documentFolder: DocumentFolder): void;
}>();

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

const cardSizeClasses = computed(() => {
	switch (props.size) {
		case "small":
			return "max-w-[100px] max-h-[100px]";
		case "large":
			return "max-w-[300px] max-h-[300px]";
		case "default":
		default:
			return "max-w-[180px] max-h-[180px]";
	}
});

const textSize = computed(() => {
	switch (props.size) {
		case "small":
			return "text-xs";
		case "large":
			return "text-base";
		case "default":
		default:
			return "text-sm";
	}
});

function onClick() {
	emit("click", props.documentFolder);
}

function onDelete() {
	emit("delete", props.documentFolder);
}

</script>

<template>
	<DSValidationDialog
		:open="isOpenRemoveDocumentFolderDialog"
		@update:open="setStateRemoveDocumentFolderDialog"
		:title="$t('removeDocumentFolderDialog.title')"
		:description="$t('removeDocumentFolderDialog.description')"
		:accept-label="$t('cta.validate')"
		:reject-label="$t('cta.refuse')"
		@accept="onDelete"
	/>

	<div
		class="group cursor-pointer"
		@click="onClick"
	>
		<DSCard
			:class="[
				'transition-all hover:shadow-md border border-gray-200 p-4 aspect-square flex flex-col w-full',
				cardSizeClasses
			]"
		>
			<div class="flex items-start justify-between">
				<div class="flex items-center space-x-2">
					<DSIcon
						name="folderOutline"
						:size="size"
					/>

					<h3 :class="['font-medium truncate', textSize]">
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
						<DSDropdownMenuItem @click.stop="setStateRemoveDocumentFolderDialog(true)">
							<DSIcon
								name="delete"
								class="h-4 w-4"
							/>
							{{ $t("cta.delete") }}
						</DSDropdownMenuItem>
					</DSDropdownMenuContent>
				</DSDropdownMenu>
			</div>

			<div
				class="mt-auto flex flex-col justify-center gap-4 pt-5"
				:class="textSize"
			>
				<div class="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
					{{ documentFolder.numberOfDocument }} item{{ documentFolder.numberOfDocument > 1 ? 's' : '' }}
				</div>

				<span class="text-gray-500">{{ formattedDate }}</span>
			</div>
		</DSCard>
	</div>
</template>
