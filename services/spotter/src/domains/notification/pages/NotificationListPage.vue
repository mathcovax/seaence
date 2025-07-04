<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { useNotificationListPage } from "../composables/useNotificationListPage";
import { notificationWrapper } from "../utils/notificationWrapper";

const { $pt } = notificationListPage.use();
const router = useRouter();
const { scrollToTop } = useScroll();
const {
	notificationList,
	notificationListPageInformation,
	pageOfNotificationList,
	setPageOfNotificaitonList,
} = useNotificationListPage(
	() => {
		router.back();
	},
);
const { seeNotifications } = useUserInformation();

watch(
	pageOfNotificationList,
	() => {
		scrollToTop("instant");
	},
);

onMounted(() => {
	seeNotifications();
});
</script>

<template>
	<section class="max-w-5xl mx-auto px-4 py-8">
		<div
			v-if="notificationListPageInformation"
			class="flex flex-col gap-6"
		>
			<div class="flex gap-4 items-start">
				<BackButton />

				<h1 class="text-3xl font-semibold text-blue-seaence">
					{{ $pt("title") }}
				</h1>
			</div>

			<div v-if="notificationList && notificationList.length > 0">
				<div class="space-y-6">
					<div
						v-for="notification in notificationList"
						:key="notification.id"
					>
						<component :is="notificationWrapper(notification)" />
					</div>
				</div>

				<div class="mt-10 flex justify-center">
					<DSPagination
						v-if="notificationListPageInformation.totalNoticationCount > notificationListPageInformation.quantityNotificationPerPage"
						:total="notificationListPageInformation.totalNoticationCount"
						:current-page="pageOfNotificationList"
						:quantity-per-page="notificationListPageInformation.quantityNotificationPerPage"
						@update="setPageOfNotificaitonList"
					/>
				</div>
			</div>

			<div
				v-else
				class="py-16 text-center text-muted-foreground"
			>
				<p class="italic">
					{{ $pt("noNotification") }}
				</p>
			</div>
		</div>
	</section>
</template>
