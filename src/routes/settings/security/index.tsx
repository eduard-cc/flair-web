import {createFileRoute} from '@tanstack/react-router';

import {Skeleton} from '@/components/ui/skeleton';
import {AccountDelete} from '@/features/settings/components/account-delete/account-delete';
import {SessionList} from '@/features/settings/components/session/session-list';
import {SignInMethods} from '@/features/settings/components/sign-in-methods/sign-in-methods';
import {useCurrentUser} from '@/hooks/use-current-user';
import {handleAuthenticatedRedirect} from '@/utils/handle-redirect';

export const Route = createFileRoute('/settings/security/')({
  component: SettingsSecurityIndex,
  beforeLoad: ({context}) => {
    handleAuthenticatedRedirect(context);
  },
});

function SettingsSecurityIndex() {
  const {currentUser} = useCurrentUser({skipFetch: true});

  if (!currentUser) {
    return <Skeleton className='h-[19.5rem] w-full rounded-lg bg-card' />;
  }

  return (
    <div className='w-full'>
      <h1 className='mb-6 text-2xl font-medium'>Security & access</h1>
      <div className='space-y-8'>
        <SignInMethods currentUser={currentUser} />
        <SessionList />
        <AccountDelete />
      </div>
    </div>
  );
}
