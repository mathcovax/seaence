<script setup lang="ts">
import DSButton from "./ui/button/DSButton.vue";
</script>

<template>
	<DSButton
		class="cursor-pointer"
		variant="destructive"
	>
		<slot />
	</DSButton>
</template>
