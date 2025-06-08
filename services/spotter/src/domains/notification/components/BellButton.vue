<script setup lang="ts">

const model = defineModel<boolean>();

const emit = defineEmits<{ click: [] }>();

function onClick() {
	model.value = !model.value;
	emit("click");
}

</script>

<template>
	<DSButton
		variant="ghost"
		size="icon"
		@click="onClick"
	>
		<DSIcon
			:name="model ? 'bell' : 'bellOutline'"
		/>
	</DSButton>
</template>
