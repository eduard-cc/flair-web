import {SideBar} from '@/components/shared/sidebar';
import {AccountsList} from '@/features/accounts/components/accounts-list';
import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/accounts')({
  component: Accounts,
  beforeLoad: ({context}) => {
    if (!context.isAuthenticated) {
      throw redirect({to: '/login'});
    }
  },
});

function Accounts() {
  return (
    <div className='flex'>
      <SideBar />
      <AccountsList />
    </div>
  );
}
