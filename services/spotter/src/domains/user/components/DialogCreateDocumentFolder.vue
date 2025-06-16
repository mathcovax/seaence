<script setup lang="ts">

interface Props {
	title?: string;
	open: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
	"update:open": [value: boolean];
}>();

</script>

<template>
	<DSDialog
		:open="open"
		@update:open="(value) => emit('update:open', value)"
	>
		<template
			#title
			v-if="title"
		>
			{{ title }}
		</template>

		<template #content>
			<slot />
		</template>
	</DSDialog>
</template>
