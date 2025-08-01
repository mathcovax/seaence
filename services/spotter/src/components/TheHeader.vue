<script setup lang="ts">
import { useAuthDialog } from "@/domains/auth/composables/useAuthDialog";
import AccountDropdown from "@/domains/user/components/AccountDropdown.vue";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import DSIcon from "@vendors/design-system/components/ui/icon/DSIcon.vue";

const { isConnected } = useUserInformation();
const { isScrolled } = useScroll({ allowScrollEvent: true });

const { toggle } = useAuthDialog();
</script>

<template>
	<header
		data-testid="header"
		class="sticky top-0 left-0 z-50 bg-background transition-shadow duration-300"
		:class="{ 'shadow-md': isScrolled }"
	>
		<div class="container h-[var(--header-height)] flex items-center justify-between">
			<RouterLink :to="homePage">
				<DSImage
					src="/images/logos/logo-text.svg"
					alt="Seaence"
					class="hidden sm:block w-[132px] h-[38px]"
				/>

				<DSImage
					src="/images/logos/logo.svg"
					alt="Seaence"
					class="block sm:hidden size-[38px]"
				/>
			</RouterLink>

			<div class="flex gap-8 items-center">
				<nav>
					<ul class="flex gap-4 text-primary">
						<li>
							<RouterLink
								data-testid="header-simple-search"
								class="flex gap-1 items-center hover:underline"
								:to="simpleSearchPage"
								:title="$t('layout.base.header.link.simple')"
							>
								<DSIcon name="magnify" />

								<span class="hidden sm:block">{{ $t("layout.base.header.link.search") }}</span>

								<span>{{ $t("layout.base.header.link.simple") }}</span>
							</RouterLink>
						</li>

						<li>
							<RouterLink
								class="flex gap-1 items-center hover:underline"
								:to="advancedSearchPage"
								:title="$t('layout.base.header.link.advanced')"
							>
								<DSIcon name="magnifyPlus" />

								<span class="hidden sm:block">{{ $t("layout.base.header.link.search") }}</span>

								<span>{{ $t('layout.base.header.link.advanced') }}</span>
							</RouterLink>
						</li>
					</ul>
				</nav>

				<DSPrimaryButton
					data-testid="header-sign-button"
					v-if="!isConnected"
					:title="$t('cta.connection')"
					@click="toggle"
				>
					<p class="hidden lg:block">
						{{ $t('cta.connection') }}
					</p>

					<DSIcon
						class="lg:hidden"
						name="login"
					/>
				</DSPrimaryButton>

				<AccountDropdown v-else />
			</div>
		</div>
	</header>
</template>
