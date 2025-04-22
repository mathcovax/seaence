<script setup lang="ts">
interface Props {
	message: string;
}

defineProps<Props>();

</script>

<template>
	<span>
		{{ message }}
	</span>
</template>
