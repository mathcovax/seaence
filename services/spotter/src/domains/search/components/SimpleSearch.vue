<script setup lang="ts">
const emit = defineEmits<{
	"update:language": [string];
}>();

function handleLanguageChange(language: string) {
	emit("update:language", language);
}
</script>

<template>
	<DSInputSearch
		:placeholder="$t('layout.base.header.search.placeholder')"
		:button-text="$t('cta.search')"
		:autofocus="true"
		@update:language="handleLanguageChange"
	/>
</template>
