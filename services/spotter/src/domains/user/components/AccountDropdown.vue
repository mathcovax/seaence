<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { disconect } = useUserInformation();
</script>

<template>
	<DSDropdownMenu>
		<DSDropdownMenuTrigger>
			<DSOutlineButton
				square
				rounded
			>
				<DSIcon name="account" />
			</DSOutlineButton>
		</DSDropdownMenuTrigger>

		<DSDropdownMenuContent align="end">
			<DSDropdownMenuItem>
				<RouterLink
					:to="profilePage"
					class="w-full"
				>
					{{ $t("layout.base.header.accountDropdown.profile") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuItem>
				<RouterLink
					:to="notificationListPage"
					class="w-full"
				>
					{{ $t("layout.base.header.accountDropdown.notification") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuItem>
				<RouterLink :to="documentFolderPage.createTo()">
					{{ $t("layout.base.header.accountDropdown.documentFolder") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem @click="disconect">
				<span class="w-full cursor-pointer">{{ $t("layout.base.header.accountDropdown.disconnect") }}</span>
			</DSDropdownMenuItem>
		</DSDropdownMenuContent>
	</DSDropdownMenu>
</template>
