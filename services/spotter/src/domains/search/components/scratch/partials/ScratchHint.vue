<script setup lang="ts">
interface Props {
	message: string;
}

defineProps<Props>();

</script>

<template>
	<span class="text-red-500 text-xs">
		{{ message }}
	</span>
</template>
