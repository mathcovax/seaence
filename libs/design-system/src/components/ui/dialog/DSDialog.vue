<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from "reka-ui";
import DSDialogContent from "./DSDialogContent.vue";
import DSDialogTitle from "./DSDialogTitle.vue";
import DSDialogDescription from "./DSDialogDescription.vue";
import DSDialogHeader from "./DSDialogHeader.vue";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const slot = defineSlots<{
	content: never;
	title: never;
	description: never;
}>();

</script>

<template>
	<DialogRoot
		data-slot="dialog"
		v-bind="forwarded"
	>
		<DSDialogContent>
			<DSDialogHeader>
				<DSDialogTitle>
					<slot name="title" />
				</DSDialogTitle>

				<DSDialogDescription v-if="slot.description">
					<slot name="description" />
				</DSDialogDescription>
			</DSDialogHeader>

			<slot name="content" />
		</DSDialogContent>
	</DialogRoot>
</template>
