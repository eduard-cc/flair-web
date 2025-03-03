import {useState} from 'react';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {useMediaQuery} from '@/hooks/use-media-query';

import {AccountAddForm} from './account-add-form';

export function AccountAddDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add account</Button>
        </DialogTrigger>
        <DialogContent className='max-w-96' aria-describedby='Add account'>
          <DialogHeader>
            <DialogTitle>Add account</DialogTitle>
          </DialogHeader>
          <AccountAddForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Add account</Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby='Add account'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add account</DrawerTitle>
        </DrawerHeader>
        <AccountAddForm className='px-4' setOpen={setOpen} />
        <DrawerFooter className='pt-4'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
