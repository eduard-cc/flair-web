import {Link, createFileRoute} from '@tanstack/react-router';

import Logo from '@/assets/logo';
import {Separator} from '@/components/ui/separator';
import {SignUpForm} from '@/features/auth/components/signup-form';
import {handleUnauthenticatedRedirect} from '@/utils/handle-redirect';

export const Route = createFileRoute('/signup')({
  component: SignUp,
  beforeLoad: ({context}) => {
    handleUnauthenticatedRedirect(context);
  },
});

function SignUp() {
  return (
    <div className='mx-6 flex h-screen items-center justify-center'>
      <div className='mx-auto flex w-full max-w-96 flex-col justify-center'>
        <div className='flex flex-col items-center'>
          <Logo aria-label='Flair logo' className='mb-10 h-8 w-8 text-foreground' />
          <h1 className='mb-12 text-center text-2xl font-semibold'>Create your account</h1>
        </div>
        <SignUpForm />
        <div className='mt-6 space-y-6 text-center text-sm'>
          <div>
            <p>By signing up, you agree to our </p>
            <p>
              <Link
                to='/signup'
                className='text-sm font-medium underline decoration-accent underline-offset-4 hover:decoration-foreground'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to='/signup'
                className='text-sm font-medium underline decoration-accent underline-offset-4 hover:decoration-foreground'
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className='flex justify-center'>
            <Separator className='w-1/5' />
          </div>
          <p className='text-sm'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-sm font-medium underline decoration-accent underline-offset-4 hover:decoration-foreground'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
