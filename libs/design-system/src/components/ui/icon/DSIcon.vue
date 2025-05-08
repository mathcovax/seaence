<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import {
	mdiMenu,
	mdiClose,
	mdiViewGrid,
	mdiFormatListBulletedSquare,
	mdiPlus,
	mdiArrowLeft,
	mdiAccount,
	mdiCalendar,
	mdiForum,
	mdiSend,
} from "@mdi/js";

const iconsMapper = {
	close: mdiClose,
	menu: mdiMenu,
	viewGrid: mdiViewGrid,
	formatListBulletedSquare: mdiFormatListBulletedSquare,
	plus: mdiPlus,
	arrowLeft: mdiArrowLeft,
	account: mdiAccount,
	calendar: mdiCalendar,
	forum: mdiForum,
	send: mdiSend,
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
