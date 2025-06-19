<script setup lang="ts">

const model = defineModel<boolean>();

const emit = defineEmits<{ click: [] }>();

function onClick() {
	model.value = !model.value;
	emit("click");
}

</script>

<template>
	<DSGhostButton
		square
		:icon="model ? 'bell' : 'bellOutline'"
		@click="onClick"
	/>
</template>
