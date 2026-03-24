import { ReactNode } from 'react';

interface InfoFieldProps {
  label: string;
  children: ReactNode;
}

export function InfoField({ label, children }: InfoFieldProps) {
  if (!children) return null;

  return (
    <p className="font-semibold text-gray-200 2xl:text-2xl">
      <span className="text-gray-400 font-normal">{label}: </span>
      {children}
    </p>
  );
}
