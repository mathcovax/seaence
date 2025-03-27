<script setup lang="ts">
const $pt = usePageTranslate();
</script>

<template>
	<div class="w-full max-w-2xl mx-auto flex flex-col gap-16">
		<img
			src="/images/search/magnifier.png"
			:alt="$pt('tabs.advancedSearch')"
			class="w-64 mx-auto"
		>

		<DSInputSearch
			:button-text="$t('cta.search')"
			:input-placeholder="$pt('inputSearch.placeholder')"
			class="w-full"
		/>
	</div>
</template>
