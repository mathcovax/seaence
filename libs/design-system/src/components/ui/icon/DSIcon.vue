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
	mdiMagnifyPlus,
	mdiWeb,
	mdiLogin,
	mdiForum,
	mdiArrowLeft,
	mdiSend,
	mdiLinkVariant,
	mdiBellOutline,
	mdiBell,
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
	magnifyPlus: mdiMagnifyPlus,
	web: mdiWeb,
	login: mdiLogin,
	forum: mdiForum,
	arrowLeft: mdiArrowLeft,
	send: mdiSend,
	linkVariant: mdiLinkVariant,
	bell: mdiBell,
	bellOutline: mdiBellOutline,
};

const sizeMapper = {
	small: 14,
	normal: 24,
	large: 36,
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
