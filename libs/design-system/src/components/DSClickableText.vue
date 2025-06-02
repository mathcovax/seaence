<script setup lang="ts">
interface Props {
	content: string;
}

defineProps<Props>();

const emit = defineEmits<{
	click: [];
}>();

</script>

<template>
	<p
		role="button"
		@click="emit('click')"
		class="text-primary text-start underline hover:text-secondary cursor-pointer select-none transition-all"
	>
		{{ content }}
	</p>
</template>
