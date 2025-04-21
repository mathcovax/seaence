<script generic="GenericItem extends object | string | number" setup lang="ts">
import { SelectRoot, useForwardPropsEmits, type SelectRootEmits, type SelectRootProps } from "reka-ui";
import DSSelectItem from "./DSSelectItem.vue";
import DSSelectContent from "./DSSelectContent.vue";
import DSSelectGroup from "./DSSelectGroup.vue";
import DSSelectTrigger from "./DSSelectTrigger.vue";
import DSSelectValue from "./DSSelectValue.vue";
import { type HTMLAttributes } from "vue";

interface Props extends SelectRootProps {
	items: GenericItem[];
	placeholder: string;
	valueKey?: keyof GenericItem;
	labelKey?: keyof GenericItem;
	class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const emits = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

function getKey(item: GenericItem) {
	if (typeof item === "string" || typeof item === "number") {
		return item;
	} else if (props.valueKey) {
		const value = item[props.valueKey];

		if (typeof value === "string" || typeof value === "number") {
			return value;
		}
	}

	return null;
}

function getValue(item: GenericItem) {
	if (typeof item === "string" || typeof item === "number") {
		return item;
	} else if (props.valueKey) {
		const value = item[props.valueKey];

		if (typeof value === "string" || typeof value === "number" || typeof value === "object") {
			return value;
		}
	}

	return item;
}

function getLabel(item: GenericItem) {
	if (props.labelKey && typeof item === "object") {
		const value = item[props.labelKey];

		if (typeof value === "string" || typeof value === "number") {
			return value;
		}
	}

	return item;
}

</script>

<template>
	<SelectRoot
		data-slot="select"
		v-bind="forwarded"
	>
		<DSSelectTrigger :class="props.class">
			<DSSelectValue :placeholder="placeholder" />
		</DSSelectTrigger>

		<DSSelectContent>
			<DSSelectGroup>
				<DSSelectItem
					v-for="(item, index) of items"
					:key="getKey(item) ?? index"
					:value="getValue(item)"
				>
					{{ getLabel(item) }}
				</DSSelectItem>
			</DSSelectGroup>
		</DSSelectContent>
	</SelectRoot>
</template>
