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
} from "@mdi/js";

const iconsMapper = {
	close: mdiClose,
	menu: mdiMenu,
	viewGrid: mdiViewGrid,
	formatListBulletedSquare: mdiFormatListBulletedSquare,
	plus: mdiPlus,
	user: mdiAccount,
	calendar: mdiCalendarMonth,
	document: mdiFileDocument,
	tag: mdiTag,
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
