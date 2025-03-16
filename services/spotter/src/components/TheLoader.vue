<script setup lang="ts">
const { isLoading } = useLoader();
</script>

<template>
	<div v-if="isLoading">
		<h1>Loading...</h1>
	</div>
</template>