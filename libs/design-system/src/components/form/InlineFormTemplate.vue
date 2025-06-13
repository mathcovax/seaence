<script setup lang="ts">
const emit = defineEmits<{
	submit: [];
}>();

function submit(event: Event) {
	event.preventDefault();
	emit("submit");
}

defineSlots<{
	default(): never;
	formField(): never;
}>();
</script>

<template>
	<form
		@submit="submit"
		class="flex gap-2"
	>
		<div class="grow *:w-full">
			<slot name="formField" />
		</div>

		<slot />
	</form>
</template>
