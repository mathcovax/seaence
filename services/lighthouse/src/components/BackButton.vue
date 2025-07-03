<script setup lang="ts">
const router = useRouter();
</script>

<template>
	<DSGhostButton
		class="shrink-0"
		@click="router.back()"
		icon="arrowLeft"
	>
		{{ $t("cta.back") }}
	</DSGhostButton>
</template>
