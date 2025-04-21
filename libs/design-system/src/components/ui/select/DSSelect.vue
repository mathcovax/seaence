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
	labelKey?(item: GenericItem): string;
	class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const emits = defineEmits<SelectRootEmits>();

const model = defineModel<GenericItem>({ required: true });

const forwarded = useForwardPropsEmits(props, emits);

function getKey(item: GenericItem) {
	if (props.labelKey) {
		const value = props.labelKey(item);

		if (typeof value === "string" || typeof value === "number") {
			return value;
		}
	}

	return null;
}
function getLabel(item: GenericItem) {
	if (props.labelKey) {
		const value = props.labelKey(item);

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
		v-mode="model"
	>
		<DSSelectTrigger :class="props.class">
			<DSSelectValue :placeholder="placeholder" />
		</DSSelectTrigger>

		<DSSelectContent>
			<DSSelectGroup>
				<DSSelectItem
					v-for="(item, index) of items"
					:key="getKey(item) ?? index"
					:value="item"
				>
					{{ getLabel(item) }}
				</DSSelectItem>
			</DSSelectGroup>
		</DSSelectContent>
	</SelectRoot>
</template>
