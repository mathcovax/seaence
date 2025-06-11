<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<div :class="cn('p-6 flex flex-col gap-y-1.5 border-b border-border', props.class)">
		<slot />
	</div>
</template>
