<script setup lang="ts">
import DSCheckbox from "../ui/checkbox/DSCheckbox.vue";
import DSLabel from "../ui/label/DSLabel.vue";
import { useId } from "vue";

interface Props {
	labelKey: string;
	link?: string;
	linkTextKey?: string;
}

defineProps<Props>();

const modelValue = defineModel<boolean>({ required: true });
const checkboxId = useId();
</script>

<template>
	<div class="flex gap-2 items-center">
		<DSCheckbox
			v-model="modelValue"
			:id="checkboxId"
		/>

		<DSLabel
			:for="checkboxId"
			class="cursor-pointer flex-1"
		>
			<i18n-t
				:keypath="labelKey"
				tag="span"
			>
				<template #default>
					<a
						v-if="link && linkTextKey"
						:href="link"
						target="_blank"
						class="text-sm font-medium text-blue-seaence hover:underline"
					>
						{{ $t(linkTextKey) }}
					</a>
				</template>
			</i18n-t>
		</DSLabel>
	</div>
</template>
