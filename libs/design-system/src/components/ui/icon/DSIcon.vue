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
} from "@mdi/js";

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
};

interface Props {
	name: keyof typeof iconsMapper;
	size?: string;
}

defineProps<Props>();
</script>

<template>
	<SvgIcon
		type="mdi"
		:path="iconsMapper[name]"
		:size="size"
	/>
</template>
