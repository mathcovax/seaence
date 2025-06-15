<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from "reka-ui";
import DSDialogContent from "./DSDialogContent.vue";
import DSDialogTitle from "./DSDialogTitle.vue";
import DSDialogDescription from "./DSDialogDescription.vue";
import DSDialogHeader from "./DSDialogHeader.vue";
import DSDialogTrigger from "./DSDialogTrigger.vue";

export interface Props extends DialogRootProps {
	size?: "small" | "normal" | "full";
}

const props = defineProps<Props>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const slot = defineSlots<{
	content?: never;
	title?: never;
	description?: never;
	trigger?: never;
}>();
</script>

<template>
	<DialogRoot
		data-slot="dialog"
		v-bind="forwarded"
		class="py-2"
	>
		<DSDialogTrigger
			as-child
			v-if="slot.trigger"
		>
			<slot name="trigger" />
		</DSDialogTrigger>

		<DSDialogContent :size="size ?? 'small'">
			<DSDialogHeader v-if="slot.title || slot.description">
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
