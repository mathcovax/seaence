<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

interface Icon {
	icon: string;
	size?: string;
}

defineProps<Icon>();
</script>

<template>
	<SvgIcon
		type="mdi"
		:path="icon"
		:size="size"
	/>
</template>
