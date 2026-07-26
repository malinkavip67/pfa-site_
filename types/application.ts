export const APPLICATION_STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
] as const;

export type ApplicationStatusValue = (typeof APPLICATION_STATUSES)[number];
export type ApplicationTypeValue = "PLAYER" | "PARENT";

export interface ApplicationRecord {
  id: string;
  createdAt: string;
  type: ApplicationTypeValue;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  story: string;
  isAdult: boolean;
  consent: boolean;
  status: ApplicationStatusValue;
  internalNote: string | null;
}
