<script setup lang="ts">
import type { iconSizeMapper } from "@vendors/design-system/components/ui/icon";
import type { ComparatorBoostEnumValue } from "@vendors/types-advanced-query";

const { t } = useI18n();

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

const boostLabels: Record<ComparatorBoostEnumValue, string> = {
	1: t("search.boost.low"),
	2: t("search.boost.medium"),
	3: t("search.boost.high"),
};

const boostColors: Record<ComparatorBoostEnumValue, string> = {
	1: "text-gray-600",
	2: "text-orange-600",
	3: "text-red-600",
};

</script>

<template>
	<div class="relative">
		<DSOutlineButton
			@click="changeBoost"
			:title="boostLabels[modelValue]"
			square
			size="small"
			class="transition-all"
		>
			<DSIcon
				name="weight"
				class="absolute transition-all"
				:class="boostColors[modelValue]"
				:size="iconSize[modelValue]"
			/>
		</DSOutlineButton>

		<span
			class="absolute top-[-4px] right-[-4px] size-4 flex items-center justify-center text-xs font-bold bg-background border border-border rounded-full shadow-sm transition-colors"
			:class="boostColors[modelValue]"
		>
			{{ modelValue }}
		</span>
	</div>
</template>
