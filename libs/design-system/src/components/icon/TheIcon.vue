<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

interface Props {
	icon: string;
	size?: string;
}

defineProps<Props>();
</script>

<template>
	<SvgIcon
		type="mdi"
		:path="icon"
		:size="size"
	/>
</template>
