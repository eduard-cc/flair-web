import {Link, useParams} from '@tanstack/react-router';

import {Button} from '@/components/ui/button';

import {useGetAccount} from '../api/use-get-account';
import {AccountsBreadcrumb} from './accounts-breadcrumb';

export function AccountDetails() {
  const {accountId} = useParams({from: '/accounts/$accountId'});

  const {account, isPending} = useGetAccount(accountId);

  if (isPending) return <div>Loading...</div>;
  if (!account) return <div>Account not found</div>;

  return (
    <>
      <AccountsBreadcrumb account={account} />
      <h1>Account Details</h1>
      <p>{account.bank}</p>
      <p>{account.id}</p>
      <Button asChild>
        <Link to='/accounts/$accountId/bank-statements' params={{accountId}}>
          Statements
        </Link>
      </Button>
    </>
  );
}
