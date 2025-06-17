<script setup lang="ts">
import DSPrimaryButton from "@vendors/design-system/components/ui/button/DSPrimaryButton.vue";
import RegisterNotificationCard from "../components/RegisterNotificationCard.vue";
import ReplyToPostNotificationCard from "../components/ReplyToPostNotificationCard.vue";
import { useNotificationListPage } from "../composables/useNotificationListPage";

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

function onClikReplyPostNotification(postId: string) {
	void router.push(
		postPage.createTo({
			params: {
				postId,
			},
		}),
	);
}

watch(
	pageOfNotificationList,
	() => {
		scrollToTop("instant");
	},
);
</script>

<template>
	<section class="max-w-5xl mx-auto px-4 py-8">
		<div
			v-if="notificationListPageInformation"
			class="flex flex-col gap-6"
		>
			<div class="mb-6 flex gap-4 items-center">
				<DSPrimaryButton
					icon="arrowLeft"
					@click="router.back()"
				/>

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
						<RegisterNotificationCard
							v-if="notification.type === 'registerNotificationType'"
							:register-notification="notification"
						/>

						<ReplyToPostNotificationCard
							v-else-if="notification.type === 'replyToPostNotificationType'"
							:reply-to-post-notification="notification"
							@click="onClikReplyPostNotification(notification.postId)"
						/>
					</div>
				</div>

				<div class="mt-10 flex justify-center">
					<DSPagination
						:total="notificationListPageInformation.totalNoticationCount"
						:current-page="pageOfNotificationList"
						:quantity-per-page="notificationListPageInformation.quantityNotificationPerPage"
						@update="setPageOfNotificaitonList"
					/>
				</div>
			</div>

			<div
				v-else
				class="text-center text-gray-500 mt-10"
			>
				<p class="italic">
					{{ $pt("noNotification") }}
				</p>
			</div>
		</div>
	</section>
</template>
