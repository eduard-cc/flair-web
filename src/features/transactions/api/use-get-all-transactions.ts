import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {PaginationState} from '@tanstack/react-table';
import {useState} from 'react';
import {toast} from 'sonner';

import {Category} from '@/types/category';
import {Transaction} from '@/types/transaction';
import {api} from '@/utils/api';

import {SearchParams} from '../types/search-params';

type TransactionsResponse = {
  transactions: Transaction[];
  total: number;
};

export type TransactionFilter = {
  categories?: Category[];
};

export const useGetAllTransactions = (searchParams: SearchParams) => {
  const [pagination, setPagination] = useState<PaginationState>(searchParams);
  const [filters, setFilters] = useState<TransactionFilter>(searchParams);

  const {data, isPending, isError, isPlaceholderData} = useQuery<TransactionsResponse>({
    queryKey: ['transactions', pagination, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        pageIndex: pagination.pageIndex.toString(),
        pageSize: pagination.pageSize.toString(),
      });

      if (filters.categories) {
        filters.categories.forEach((category) => params.append('categories[]', category));
      }

      const response = await api.get(`/transactions?${params.toString()}`);
      return response.json();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    toast.error('There was a problem with your request.', {
      description: 'Your transactions could not be loaded. Please try again.',
    });
  }

  return {
    data,
    isPending,
    isPlaceholderData,
    pagination,
    setPagination,
    filters,
    setFilters,
  };
};
