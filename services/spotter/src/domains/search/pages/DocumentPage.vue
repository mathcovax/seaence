<script setup lang="ts">
const { params } = documentPage.use();
</script>

<template>
	<div>
		document {{ params.id }}
	</div>
</template>
