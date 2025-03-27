<script setup lang="ts">
import DSButton from "./ui/button/DSButton.vue";

</script>

<template>
	<DSButton
		variant="outline"
		size="icon"
		class="shrink-0 cursor-pointer"
	>
		<slot />
	</DSButton>
</template>
