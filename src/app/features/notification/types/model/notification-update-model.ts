import {NotificationTypesEnum} from '../common/notification-types.enum';

export interface INotificationUpdateModel {
  isNotifyTeachers: boolean;
  isNotifyAdmins: boolean;
  adminEmails: Array<string>;
  notifyType: NotificationTypesEnum;
  notifyDay: number;
  notifyTime: string;
  notifyBeforeDays: number;
  attestationYearsPeriod: number;
  requiredInternshipHours: number;
}
