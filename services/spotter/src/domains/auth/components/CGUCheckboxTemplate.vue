<script setup lang="ts">
import { useId } from "vue";

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
			<I18nT
				keypath="authDialog.registerForm.CGULabel"
				tag="span"
			>
				<template #default>
					<a
						:href="cguPage.recordRaw.path"
						target="_blank"
						class="text-sm font-medium text-blue-seaence hover:underline"
					>
						{{ $t("authDialog.registerForm.CGULinkText") }}
					</a>
				</template>
			</I18nT>
		</DSLabel>
	</div>
</template>
