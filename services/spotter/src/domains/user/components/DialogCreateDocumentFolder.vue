<script setup lang="ts">

interface Props {
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
		<template #title>
			{{ $t("CreateDocumentFolder.title") }}
		</template>

		<template #content>
			<slot />
		</template>
	</DSDialog>
</template>
