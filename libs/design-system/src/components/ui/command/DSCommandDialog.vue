<script setup lang="ts">
import { type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from "reka-ui";
import DSDialog from "../dialog/DSDialog.vue";
import DSDialogContent from "../dialog/DSDialogContent.vue";
import DSDialogDescription from "../dialog/DSDialogDescription.vue";
import DSDialogHeader from "../dialog/DSDialogHeader.vue";
import DSDialogTitle from "../dialog/DSDialogTitle.vue";
import Command from "./DSCommand.vue";

const props = withDefaults(defineProps<DialogRootProps & {
	title?: string;
	description?: string;
}>(), {
	title: "Command Palette",
	description: "Search for a command to run...",
});
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DSDialog v-bind="forwarded">
		<DSDialogHeader class="sr-only">
			<DSDialogTitle>{{ title }}</DSDialogTitle>

			<DSDialogDescription>{{ description }}</DSDialogDescription>
		</DSDialogHeader>

		<DSDialogContent
			class="overflow-hidden p-0 "
			size="small"
		>
			<Command :search-term="''">
				<slot />
			</Command>
		</DSDialogContent>
	</DSDialog>
</template>
