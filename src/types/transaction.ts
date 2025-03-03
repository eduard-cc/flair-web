import {Account} from './account';
import {Category} from './category';

export type Transaction = {
  id: string;
  startedAt: Date;
  completedAt: Date;
  description: string;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  account: Account;
};
