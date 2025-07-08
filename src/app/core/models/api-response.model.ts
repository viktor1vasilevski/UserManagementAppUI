import { NotificationType } from "../enums/notification-type.enum";

export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
  notificationType: NotificationType;
  totalCount?: number;
}