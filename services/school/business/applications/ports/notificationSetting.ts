import { C } from "@duplojs/utils";
import type { BaseRepositoryPort } from "./types";
import type { NotificationSetting } from "@domains/entities/notificationSetting";

export interface NotificationSettingPort extends BaseRepositoryPort<NotificationSetting.Entity> {
}

export const NotificationSettingPort = C.createPort<NotificationSettingPort>();
