import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { CaretRight } from 'phosphor-react';

interface HeaderProps {
  isSidebarOpen: boolean;
}

export function Header({ isSidebarOpen }: HeaderProps) {
  const isMacOS = process.platform === 'darwin';

  return (
    <div
      id="header"
      className={clsx(
        'flex items-center gap-4 2xl:gap-8 leading-tight relative border-b border-slate-600 transition-all duration-200 py-4.5 px-6 2xl:py-8 2xl:px-10 region-drag',
        {
          'pl-24 2xl:pl-32': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-220px)] 2xl:w-[calc(100vw-320px)]': isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          'h-7 w-7 2xl:h-10 2xl:w-10 text-gray-800 bg-gray-100 rounded-full relative z-99 region-no-drag items-center justify-center',
          {
            hidden: isSidebarOpen,
            flex: !isSidebarOpen,
          },
        )}
      >
        <CaretRight className="w-5 h-5 2xl:w-7 2xl:h-7" />
      </Collapsible.Trigger>

      <>
        {/* Título maior no 4K */}
        <h1 className="text-white font-bold 2xl:text-3xl">Dev Clientes</h1>
      </>
    </div>
  );
}
