import clsx from 'clsx';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: ReactNode;
}

export function LinkContent({ to, children }: LinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx(
          'flex items-center text-sm 2xl:text-xl gap-2 py-2 px-3 2xl:py-4 2xl:px-5 rounded group transition-colors',
          {
            'bg-gray-50 font-semibold text-black': isActive,
            'text-gray-300 hover:bg-gray-800 hover:text-white': !isActive,
          },
        );
      }}
    >
      <span className="truncate flex-1">{children}</span>
    </NavLink>
  );
}
