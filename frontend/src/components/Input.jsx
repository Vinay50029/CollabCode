import { forwardRef } from 'react';

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

export const Input = forwardRef(function Input(
  {
    label,
    error,
    className,
    labelClassName,
    containerClassName,
    errorClassName,
    id,
    type = 'text',
    ...props
  },
  ref,
) {
  const inputId = id || props.name;

  return (
    <div className={cn('w-full', containerClassName)}>
      {label ? (
        <label htmlFor={inputId} className={cn('mb-2 block text-sm font-medium', labelClassName)}>
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        type={type}
        aria-invalid={!!error}
        className={cn(
          'w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className,
        )}
        {...props}
      />
      {error ? (
        <p className={cn('mt-1 text-sm text-red-400', errorClassName)}>{error}</p>
      ) : null}
    </div>
  );
});
