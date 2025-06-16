<script setup lang="ts">
import type { DocumentInFoloder } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	documentInFolder: DocumentInFoloder;
	isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	isSelected: false,
});

// eslint-disable-next-line @stylistic/js/function-call-spacing
const emit = defineEmits<{
	(event: "click", document: DocumentInFoloder): void;
	(event: "delete", document: DocumentInFoloder): void;
}>();

const formattedDate = computed(() => new Intl.DateTimeFormat("fr-FR", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
}).format(new Date(props.documentInFolder.addedAt)));

function handleClick() {
	emit("click", props.documentInFolder);
}

function handleDelete() {
	emit("delete", props.documentInFolder);
}

</script>

<template>
	<div
		class="flex items-center py-3 px-4 hover:bg-gray-50 rounded-md transition-colors cursor-pointer group"
		:class="{ 'bg-blue-50': isSelected }"
		@click="handleClick"
	>
		<div class="flex-shrink-0 mr-4">
			<DSIcon
				name="fileOutline"
				class="h-5 w-5 text-gray-500"
				:class="{ 'text-blue-seaence': isSelected }"
			/>
		</div>

		<div class="flex-grow min-w-0">
			<h4 class="text-sm font-medium text-gray-900 truncate">
				{{ documentInFolder.name }}
			</h4>
		</div>

		<div class="flex-shrink-0 ml-4 text-xs text-gray-500">
			{{ formattedDate }}
		</div>

		<div class="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
					<DSDropdownMenuItem @click.stop="handleDelete">
						<DSIcon
							name="delete"
							class="h-4 w-4 mr-2"
						/>
						{{ $t("cta.delete") }}
					</DSDropdownMenuItem>
				</DSDropdownMenuContent>
			</DSDropdownMenu>
		</div>
	</div>
</template>
