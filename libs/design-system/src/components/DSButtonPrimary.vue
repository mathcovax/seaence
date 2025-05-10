<script setup lang="ts">
import DSButton from "./ui/button/DSButton.vue";
</script>

<template>
	<DSButton
		class="cursor-pointer"
		variant="primary"
	>
		<slot />
	</DSButton>
</template>
