<script setup lang="ts">
import { ref } from "vue";
import { DSSkeleton } from "./ui/skeleton";

interface Props {
	alt: string;
	src: string;
}

defineProps<Props>();

const isLoading = ref(true);
</script>

<template>
	<div :class="$attrs.class">
		<DSSkeleton
			v-if="isLoading"
			class="w-full h-full"
		/>

		<img
			v-show="!isLoading"
			:src="src"
			:alt="alt"
			class="w-full h-full object-contain"
			@load="isLoading = false"
		>
	</div>
</template>
