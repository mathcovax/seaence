<script setup lang="ts">
import { cn } from "../../../lib/utils";
import { Check } from "lucide-vue-next";
import {
	type CheckboxRootEmits,
	type CheckboxRootProps,
	CheckboxIndicator,
	CheckboxRoot,
	useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
	const { class: _class, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<CheckboxRoot
		v-bind="forwarded"
		:class="cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
			props.class)"
	>
		<CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
			<slot>
				<Check class="h-4 w-4" />
			</slot>
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
