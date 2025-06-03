<script setup lang="ts">

const model = defineModel<boolean>();

const emit = defineEmits<{ click: [] }>();

function onClick() {
	model.value = !model.value;
	emit("click");
}

</script>

<template>
	<DSButtonIcon
		@click="onClick"
	>
		<DSIcon
			:name="model ? 'bell' : 'bellOutline'"
		/>
	</DSButtonIcon>
</template>
