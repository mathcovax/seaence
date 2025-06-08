<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { computed } from "vue";
import { iconsMapper, iconSizeMapper } from ".";

interface Props {
	name: keyof typeof iconsMapper;
	size?: keyof typeof iconSizeMapper;
}

const props = defineProps<Props>();

const iconStyle = computed(
	() => props.size
		? ({
			height: `${iconSizeMapper[props.size]}px`,
			width: `${iconSizeMapper[props.size]}px`,
		})
		: ({
			height: `${iconSizeMapper.default}px`,
			width: `${iconSizeMapper.default}px`,
		}),
);

</script>

<template>
	<SvgIcon
		type="mdi"
		:path="iconsMapper[name]"
		:style="iconStyle"
	/>
</template>
