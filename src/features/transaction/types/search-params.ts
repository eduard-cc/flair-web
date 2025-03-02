import {z} from 'zod';

import {Category} from '@/types/category';
import {paginationSearchParamsSchema} from '@/types/pagination';

export enum SortField {
  STARTED_AT = 'startedAt',
  AMOUNT = 'amount',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

const toDate = (val: unknown) => (typeof val === 'string' ? new Date(val) : val);

export const transactionSearchParamsSchema = paginationSearchParamsSchema.extend({
  categories: z.array(z.nativeEnum(Category)).optional(),
  startedAt: z
    .object({
      from: z.preprocess(toDate, z.date()),
      to: z.preprocess(toDate, z.date()).optional(),
    })
    .optional(),
  sort: z.array(z.object({by: z.nativeEnum(SortField), order: z.nativeEnum(SortOrder)})).optional(),
});

export type TransactionSearchParams = z.infer<typeof transactionSearchParamsSchema>;

export type TransactionFilterParams = Pick<TransactionSearchParams, 'categories' | 'startedAt'>;

export type TransactionSortParams = TransactionSearchParams['sort'];
