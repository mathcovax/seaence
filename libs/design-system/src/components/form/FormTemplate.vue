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
		class="flex flex-col gap-2"
	>
		<slot name="formField" />

		<div>
			<slot />
		</div>
	</form>
</template>
