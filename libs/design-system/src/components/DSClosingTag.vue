<script setup lang="ts">
import DSIcon from "./ui/icon/DSIcon.vue";

const emit = defineEmits<{
	close: [];
}>();
</script>

<template>
	<div class="pl-3 pr-2 flex gap-2 items-center whitespace-nowrap bg-whiteless rounded-sm">
		<div class="truncate">
			<slot />
		</div>

		<DSIcon
			class="cursor-pointer transition"
			name="close"
			@click="emit('close')"
		/>
	</div>
</template>
