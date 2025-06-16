<script setup lang="ts">
interface Props {
	types: [];
}

defineProps<Props>();

const _modelValue = defineModel<string>({});

</script>

<template>
	<slot />
</template>
