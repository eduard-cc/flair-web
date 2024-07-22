import {CircleAlert, CircleCheck, Loader} from 'lucide-react';
import prettyBytes from 'pretty-bytes';

import {cn} from '@/utils/cn';

type FileMetadataProps = {
  fileSize: File['size'];
  fileType: File['type'];
  progressMessage: string;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export function FileMetadata({
  fileSize,
  fileType,
  progressMessage,
  isPending,
  isError,
  isSuccess,
}: FileMetadataProps) {
  return (
    <span className='mt-1 flex items-center whitespace-nowrap text-sm text-muted-foreground'>
      <span>{prettyBytes(fileSize)}</span>
      <span className='mx-3'>•</span>
      <span>{fileType}</span>
      <span className='mx-3'>•</span>
      <span
        className={cn(
          'flex items-center',
          isError && 'text-destructive',
          isSuccess && 'text-success',
        )}
      >
        {isPending && (
          <>
            <Loader className='mr-1 inline h-4 w-4 animate-slow-spin' />
            <span>{progressMessage}</span>
          </>
        )}
        {isError && (
          <>
            <CircleAlert className='mr-1 inline h-4 w-4' />
            <span>Failed</span>
          </>
        )}
        {isSuccess && (
          <>
            <CircleCheck className='mr-1 h-4 w-4' />
            <span>Completed</span>
          </>
        )}
      </span>
    </span>
  );
}
