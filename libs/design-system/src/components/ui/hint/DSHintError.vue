<script setup lang="ts">
interface Props {
	message?: string;
}

defineProps<Props>();

</script>

<template>
	<small
		v-if="message"
		class="text-destructive text-xs mt-1"
	>
		{{ message }}
	</small>
</template>
