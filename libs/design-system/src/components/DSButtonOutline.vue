<script setup lang="ts">
import DSButton from "./ui/button/DSButton.vue";
</script>

<template>
	<DSButton
		variant="outline"
		class="text-primary border-primary cursor-pointer hover:text-primary"
	>
		<slot />
	</DSButton>
</template>
