<script setup lang="ts">
import DSDialog, { type Props as DSDialogProps } from "./ui/dialog/DSDialog.vue";
import { type DialogRootEmits, useForwardPropsEmits } from "reka-ui";
import DSDialogFooter from "./ui/dialog/DSDialogFooter.vue";
import DSDialogClose from "./ui/dialog/DSDialogClose.vue";
import DSOutlineButton from "./ui/button/DSOutlineButton.vue";
import DSButton from "./ui/button/DSButton.vue";

interface Props extends DSDialogProps {
	title: string;
	description?: string;
	acceptLabel: string;
	rejectLabel: string;
	destructive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	destructive: false,
	size: "small",
});

const emits = defineEmits<DialogRootEmits & {
	accept: [];
	reject: [];
}>();

const forwarded = useForwardPropsEmits(props, emits);

const slots = defineSlots<{
	default?: never;
	content?: never;
}>();

function handleAccept() {
	emits("accept");
}

function handleReject() {
	emits("reject");
}
</script>

<template>
	<DSDialog
		v-bind="forwarded"
		:size="size"
	>
		<template
			v-if="slots.default"
			#trigger
		>
			<slot />
		</template>

		<template #title>
			{{ title }}
		</template>

		<template
			#description
			v-if="description"
		>
			{{ description }}
		</template>

		<template #content>
			<template v-if="slots.content">
				<slot name="content" />
			</template>

			<DSDialogFooter>
				<DSDialogClose as-child>
					<DSOutlineButton @click="handleReject">
						{{ rejectLabel }}
					</DSOutlineButton>
				</DSDialogClose>

				<DSDialogClose as-child>
					<DSButton
						:variant="destructive ? 'destructive' : 'primary'"
						@click="handleAccept"
					>
						{{ acceptLabel }}
					</DSButton>
				</DSDialogClose>
			</DSDialogFooter>
		</template>
	</DSDialog>
</template>
