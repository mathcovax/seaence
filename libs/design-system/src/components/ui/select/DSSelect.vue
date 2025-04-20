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
	class: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const emits = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

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
					v-for="item of items"
					:key="item[valueKey]"
					:value="item[valueKey]"
				>
					{{ item[labelKey] }}
				</DSSelectItem>
			</DSSelectGroup>
		</DSSelectContent>
	</SelectRoot>
</template>
