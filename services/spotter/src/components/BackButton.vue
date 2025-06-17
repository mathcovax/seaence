<script setup lang="ts">
const router = useRouter();
</script>

<template>
	<DSOutlineButton
		square
		class="shrink-0"
		@click="router.back()"
	>
		<DSIcon name="arrowLeft" />
	</DSOutlineButton>
</template>
