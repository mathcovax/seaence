<script setup lang="ts">
import { ref } from "vue";
import type { Item } from "./types";
import DSPopover from "../ui/popover/DSPopover.vue";
import DSPopoverTrigger from "../ui/popover/DSPopoverTrigger.vue";
import DSPopoverContent from "../ui/popover/DSPopoverContent.vue";
import DSButton from "../ui/button/DSButton.vue";
import DSClosingTag from "../DSClosingTag.vue";
import DSIcon from "../ui/icon/DSIcon.vue";
import DSCommand from "../ui/command/DSCommand.vue";
import DSCommandInput from "../ui/command/DSCommandInput.vue";
import DSCommandEmpty from "../ui/command/DSCommandEmpty.vue";
import DSCommandList from "../ui/command/DSCommandList.vue";
import DSCommandGroup from "../ui/command/DSCommandGroup.vue";
import DSCommandItem from "../ui/command/DSCommandItem.vue";

interface Props {
	items: Item[];
	placeholder: string;
	emptyLabel: string;
	modelValue?: Item[];
	class?: string;
	searchTerm?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	"update:modelValue": [value: Item[] | undefined];
	"update:searchTerm": [value: string];
}>();
const open = ref(false);

function removeTag(value: Item["value"]) {
	emit("update:modelValue", props.modelValue?.filter((item) => item.value !== value));
}

function onSelect(item: Item) {
	if (props.modelValue?.find((itm) => itm.value === item.value)) {
		return;
	}
	emit("update:modelValue", [...(props.modelValue || []), item]);
	open.value = false;
}

</script>

<template>
	<DSPopover v-model:open="open">
		<DSPopoverTrigger as-child>
			<DSButton
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				:class="`${props.class} !px-2 !py-0 flex gap-2`"
			>
				<div class="w-full justify-start flex overflow-y-hidden overflow-x-auto gap-2 py-2">
					<DSClosingTag
						v-for="item of modelValue"
						:key="item.value"
						@close="removeTag(item.value)"
						@click="$event.stopPropagation()"
					>
						{{ item.label }}
					</DSClosingTag>
				</div>

				<DSIcon name="plus" />
			</DSButton>
		</DSPopoverTrigger>

		<DSPopoverContent class="p-0">
			<DSCommand
				@update:search-term="(value) => emit('update:searchTerm', value)"
				:search-term="searchTerm"
				:filter-function="(val) => val"
			>
				<DSCommandInput
					class="h-9"
					:placeholder="placeholder"
				/>

				<DSCommandEmpty>{{ emptyLabel }}</DSCommandEmpty>

				<DSCommandList>
					<DSCommandGroup>
						<DSCommandItem
							v-for="item in items"
							:key="item.value"
							:value="item.value"
							@select="onSelect(item)"
						>
							{{ item.label }}
						</DSCommandItem>
					</DSCommandGroup>
				</DSCommandList>
			</DSCommand>
		</DSPopoverContent>
	</DSPopover>
</template>

<style scoped>
::-webkit-scrollbar {
	height: 0px;
}
</style>
