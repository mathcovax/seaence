<script setup lang="ts">
const model = defineModel<typeof items[number]>({
	required: true,
});

const items = [
	<const>"and",
	<const>"or",
];
</script>

<template>
	<DSSelect
		:items="items"
		:label="item => $t(`scratch.operator.${item}.label`)"
		v-model="model"
		placeholder=""
	/>
</template>
