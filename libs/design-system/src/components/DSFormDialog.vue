<script setup lang="ts" generic="GenericFormDirective extends ReturnType<typeof useFormBuilder>">
import { useForwardPropsEmits } from "reka-ui";
import DSDialog, { type Props as DSDialogProps } from "./ui/dialog/DSDialog.vue";
import DSDialogFooter from "./ui/dialog/DSDialogFooter.vue";
import DSDialogClose from "./ui/dialog/DSDialogClose.vue";
import DSPrimaryButton from "./ui/button/DSPrimaryButton.vue";
import { useFormBuilder } from "../composables/useFormBuilder";
import DSOutlineButton from "./ui/button/DSOutlineButton.vue";

interface Props extends DSDialogProps {
	title: string;
	description?: string;
	submitLabel: string;
	cancelLabel: string;
	formDirective: GenericFormDirective;
}

const openModel = defineModel<boolean>("open", { required: true });

const props = withDefaults(defineProps<Props>(), {
	size: "small",
});

const emits = defineEmits<{
	submit: [result: Exclude<ReturnType<GenericFormDirective["check"]>, null>];
}>();

const forwarded = useForwardPropsEmits(props, emits);

const slots = defineSlots<{
	default?: never;
}>();

function onSumit() {
	const result = props.formDirective.check();

	if (!result) {
		return;
	}

	emits("submit", result);
	openModel.value = false;
	setTimeout(() => void props.formDirective.reset());
}
</script>

<template>
	<DSDialog
		v-bind="forwarded"
		:size="size"
		v-model:open="openModel"
	>
		<template #title>
			{{ title }}
		</template>

		<template
			v-if="slots.default"
			#trigger
		>
			<slot />
		</template>

		<template
			#description
			v-if="description"
		>
			{{ description }}
		</template>

		<template #content>
			<props.formDirective.Form @submit="onSumit" />

			<DSDialogFooter>
				<DSDialogClose as-child>
					<DSOutlineButton>
						{{ cancelLabel }}
					</DSOutlineButton>
				</DSDialogClose>

				<DSPrimaryButton
					@click="onSumit"
				>
					{{ submitLabel }}
				</DSPrimaryButton>
			</DSDialogFooter>
		</template>
	</DSDialog>
</template>
