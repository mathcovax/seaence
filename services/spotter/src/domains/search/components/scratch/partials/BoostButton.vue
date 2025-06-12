<script setup lang="ts">
import type { iconSizeMapper } from "@vendors/design-system/components/ui/icon";
import type { ComparatorBoostEnumValue } from "@vendors/types-advanced-query";

const modelValue = defineModel<ComparatorBoostEnumValue>({ required: true });

const boostStates: Record<
	ComparatorBoostEnumValue,
	ComparatorBoostEnumValue
> = {
	1: "2",
	2: "3",
	3: "1",
};

function changeBoost() {
	modelValue.value = boostStates[modelValue.value];
}

const iconSize: Record<
	ComparatorBoostEnumValue,
	keyof typeof iconSizeMapper
> = {
	1: "small",
	2: "default",
	3: "large",
};

</script>

<template>
	<DSOutlineButton
		@click="changeBoost"
		square
		size="small"
		class="relative"
	>
		<DSIcon
			name="weight"
			class="absolute"
			:size="iconSize[modelValue]"
		/>

		<span class="top-[-2px] right-0 absolute">{{ modelValue }}</span>
	</DSOutlineButton>
</template>
