import {IdNameSimpleItem} from '../../../../shared/types/id-name-simple-item';

export interface IRebukeGetModel {
  id: number;
  title: string;
  date: string;
  orderNumber: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  guid: string;
  teacher: IdNameSimpleItem;
}
