import {Outlet, createRootRouteWithContext} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';

import {AppSidebar} from '@/components/shared/layout/app-sidebar';
import {SidebarProvider} from '@/components/ui/sidebar';

export const Route = createRootRouteWithContext<{isAuthenticated: boolean}>()({
  component: Root,
});

function Root() {
  const {isAuthenticated} = Route.useRouteContext();

  if (!isAuthenticated) {
    return (
      <>
        <main>
          <Outlet />
        </main>
        {import.meta.env.DEV && <TanStackRouterDevtools position='bottom-right' />}
      </>
    );
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className='flex-1'>
          <Outlet />
        </main>
      </SidebarProvider>
      {import.meta.env.DEV && <TanStackRouterDevtools position='bottom-right' />}
    </>
  );
}
