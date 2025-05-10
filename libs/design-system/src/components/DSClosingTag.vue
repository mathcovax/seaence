<script setup lang="ts">
import DSIcon from "./ui/icon/DSIcon.vue";

const emit = defineEmits<{
	close: [];
}>();
</script>

<template>
	<div class="flex gap-2 items-center bg-whiteless pl-3 pr-2 rounded-sm">
		<slot />

		<DSIcon
			class="hover:scale-110 transition"
			name="close"
			@click="emit('close')"
		/>
	</div>
</template>
