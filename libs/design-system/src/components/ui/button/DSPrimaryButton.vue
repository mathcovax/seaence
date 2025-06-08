<script setup lang="ts">
import { type DSButtonProps } from "./index";
import DSButton from "./DSButton.vue";

const props = defineProps<Omit<DSButtonProps, "variant">>();
</script>

<template>
	<DSButton
		variant="primary"
		v-bind="props"
	>
		<slot />
	</DSButton>
</template>
