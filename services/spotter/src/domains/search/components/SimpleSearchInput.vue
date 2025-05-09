<script setup lang="ts">
import { bakedDocumentLanguageEnum } from "@/lib/horizon/types/bakedDocument";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface Props {
	placeholder: string;
}

defineProps<Props>();

const emit = defineEmits<{
	submit: [];
}>();

const modelValue = defineModel<string>({
	required: true,
});

const modelLanguage = defineModel<BakedDocumentLanguage>(
	"language",
	{
		required: true,
	},
);

function onSubmit() {
	emit("submit");
}
</script>

<template>
	<form
		class="flex gap-2 border-2 items-center shadow-xl rounded-md overflow-hidden pl-2"
		@submit.prevent="onSubmit"
	>
		<input
			class="outline-0 grow"
			v-model="modelValue"
			:placeholder="placeholder"
		>

		<button
			type="submit"
			class="rounded-l-full rounded-r flex gap-2 items-center bg-blue-seaence hover:bg-blue-seaence/90 text-white py-1 pl-4 pr-2 shrink-0"
		>
			<DSSelect
				v-model="modelLanguage"
				:label="item => item"
				:items="bakedDocumentLanguageEnum.toTuple()"
				class="w-22 border-0 shadow-none"
				@click="$event.stopPropagation()"
			/>

			<DSIcon
				name="magnify"
			/>
		</button>
	</form>
</template>
