<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<div :class="cn('p-6 flex items-center border-t border-border bg-muted/50', props.class)">
		<slot />
	</div>
</template>
