import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { ArrowBendDoubleUpLeft } from 'phosphor-react';
import { LinkContent } from '../link';

export function Sidebar() {
  const isMacOS = process.platform === 'darwin';

  return (
    <Collapsible.Content className="bg-gray-950 shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out">
      <Collapsible.Trigger
        className={clsx(
          // Aumentamos o tamanho do botão e do ícone de recolher no 4K
          'absolute h-7 w-7 2xl:h-10 2xl:w-10 right-4 2xl:right-6 z-99 text-white hover:scale-105 duration-200 inline-flex items-center justify-center',
          {
            'top-4.5': isMacOS,
            'top-6 2xl:top-8': !isMacOS,
          },
        )}
      >
        <ArrowBendDoubleUpLeft className="h-7 w-7 2xl:h-10 2xl:w-10" />
      </Collapsible.Trigger>

      <div
        className={clsx('region-drag h-14 z-0 mt-10', {
          block: isMacOS,
          hidden: !isMacOS,
        })}
      ></div>

      <div
        className={clsx(
          // MÁGICA: Largura sobe de 220px para 320px no 4K!
          'flex-1 flex flex-col h-full gap-8 2xl:gap-12 w-[220px] 2xl:w-[320px] transition-opacity group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-200',
          {
            'pt-6 2xl:pt-10': !isMacOS,
          },
        )}
      >
        <nav className="flex mx-2 2xl:mx-4 flex-col gap-8 2xl:gap-10 text-slate-100">
          <div className="flex flex-col gap-2">
            {/* Título 'MENU' maior */}
            <div className="text-white font-semibold uppercase mb-2 ml-2 2xl:text-xl 2xl:mb-4 2xl:ml-4">
              Menu
            </div>
          </div>

          <section className="flex flex-col gap-px 2xl:gap-2">
            <LinkContent to="/">Clientes</LinkContent>
            <LinkContent to="/create">Cadastrar Cliente</LinkContent>
            <LinkContent to="/about">Sobre</LinkContent>
          </section>
        </nav>
      </div>
    </Collapsible.Content>
  );
}
