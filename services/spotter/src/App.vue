<script setup lang="ts">
import AuthDialog from "./domains/auth/components/AuthDialog.vue";

</script>

<template>
	<DSSonner close-button />

	<TheLoader />

	<AuthDialog />

	<RouterView />
</template>
