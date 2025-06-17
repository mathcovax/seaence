<script setup lang="ts">
interface Props {
	cols: number;
	space?: "default" | "large";
}

withDefaults(
	defineProps<Props>(),
	{ space: "default" },
);

</script>

<template>
	<div
		class="grid"
		:class="{
			'gap-2': space === 'default',
			'gap-4': space === 'large',
		}"
		:style="{
			'gridTemplateColumns': `repeat(${cols}, minmax(0, 1fr))`
		}"
	>
		<slot />
	</div>
</template>
