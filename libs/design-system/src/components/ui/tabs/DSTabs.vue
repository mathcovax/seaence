<script setup lang="ts">
import {
	type TabsRootEmits,
	type TabsRootProps,
	TabsRoot,
	useForwardPropsEmits,
} from "reka-ui";

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<TabsRoot v-bind="forwarded">
		<slot />
	</TabsRoot>
</template>
