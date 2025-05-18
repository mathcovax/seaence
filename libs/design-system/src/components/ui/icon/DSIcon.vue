<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import {
	mdiMenu,
	mdiClose,
	mdiViewGrid,
	mdiFormatListBulletedSquare,
	mdiPlus,
	mdiAccount,
	mdiCalendarMonth,
	mdiFileDocument,
	mdiTag,
	mdiStarOutline,
	mdiStar,
	mdiMessageText,
	mdiMagnify,
	mdiWeb,
} from "@mdi/js";
import { computed } from "vue";

const iconsMapper = {
	close: mdiClose,
	menu: mdiMenu,
	viewGrid: mdiViewGrid,
	formatListBulletedSquare: mdiFormatListBulletedSquare,
	plus: mdiPlus,
	calendar: mdiCalendarMonth,
	document: mdiFileDocument,
	tag: mdiTag,
	account: mdiAccount,
	starOutline: mdiStarOutline,
	star: mdiStar,
	messageText: mdiMessageText,
	magnify: mdiMagnify,
	web: mdiWeb,
};

const sizeMapper = {
	small: 15,
	normal: 25,
	large: 35,
};

interface Props {
	name: keyof typeof iconsMapper;
	size?: keyof typeof sizeMapper;
}

const props = defineProps<Props>();

const iconStyle = computed(
	() => props.size
		? ({
			height: `${sizeMapper[props.size]}px`,
			width: `${sizeMapper[props.size]}px`,
		})
		: ({
			height: `${sizeMapper.normal}px`,
			width: `${sizeMapper.normal}px`,
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
