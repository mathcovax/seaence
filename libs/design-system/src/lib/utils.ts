import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<unknown>>(updaterOrValue: T, ref: Ref) {
	ref.value
    = typeof updaterOrValue === "function"
			? updaterOrValue(ref.value)
			: updaterOrValue;
}

export function formatDate(
	isoString: string,
	locale = "fr-FR",
	options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	},
): string {
	if (!isoString) {
		return "";
	}

	try {
		const date = new Date(isoString);
		return new Intl.DateTimeFormat(locale, options).format(date);
	} catch (error) {
		console.error("Error while formatting date:", error);
		return isoString;
	}
}

export function getRelativeTime(isoString: string, locale = "fr-FR"): string {
	const config = {
		miliseconds: 1000,
		seconds: 60,
		minutes: 60,
		hours: 24,
		days: 7,
	};

	if (!isoString) {
		return "";
	}

	try {
		const date = new Date(isoString);
		const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
		const now = new Date();

		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / config.miliseconds);

		// Less than a minute
		if (diffInSeconds < config.seconds) {
			return rtf.format(-Math.floor(diffInSeconds), "second");
		}

		// Less than an hour
		const diffInMinutes = Math.floor(diffInSeconds / config.seconds);
		if (diffInMinutes < config.minutes) {
			return rtf.format(-diffInMinutes, "minute");
		}

		// Less than a day
		const diffInHours = Math.floor(diffInMinutes / config.minutes);
		if (diffInHours < config.hours) {
			return rtf.format(-diffInHours, "hour");
		}

		// Less than a week
		const diffInDays = Math.floor(diffInHours / config.hours);
		if (diffInDays < config.days) {
			return rtf.format(-diffInDays, "day");
		}

		// For older dates, use standard formatting
		return formatDate(isoString, locale);
	} catch (error) {
		console.error("Error while calculating relative time:", error);
		return isoString;
	}
}
