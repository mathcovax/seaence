import { C } from "@duplojs/utils";
import type { BaseRepositoryPort } from "./types";
import type { Report } from "@domains/entities/report";

export interface ReportPort extends BaseRepositoryPort<Report.Entity> {
}

export const ReportPort = C.createPort<ReportPort>();
