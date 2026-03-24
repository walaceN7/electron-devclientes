import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="text-lg 2xl:text-2xl text-gray-200">
        {label}
      </label>
      <input
        id={id}
        className={`w-full h-10 2xl:h-14 rounded text-black px-3 2xl:px-4 2xl:text-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'ring-2 ring-red-500' : ''
        }`}
        {...props}
      />
      {error && (
        <span className="text-red-400 text-sm mt-1 block">{error}</span>
      )}
    </div>
  );
}
