<script setup lang="ts">
interface Props {
	cols: number;
}

defineProps<Props>();

</script>

<template>
	<div
		class="grid gap-2"
		:style="{
			'gridTemplateColumns': `repeat(${cols}, minmax(0, 1fr))`
		}"
	>
		<slot />
	</div>
</template>
