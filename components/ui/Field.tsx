import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface WrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldWrapper({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: WrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">
        {label}
        {required && <span className="ml-0.5 text-amber-600"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm text-ink-500">{hint}</p>}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<WrapperProps, "children">;

export function TextField({
  label,
  htmlFor,
  required,
  error,
  hint,
  ...rest
}: InputProps) {
  return (
    <FieldWrapper
      label={label}
      htmlFor={htmlFor}
      required={required}
      error={error}
      hint={hint}
    >
      <input
        id={htmlFor}
        className="field"
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${htmlFor}-error` : undefined}
        {...rest}
      />
    </FieldWrapper>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<WrapperProps, "children">;

export function TextareaField({
  label,
  htmlFor,
  required,
  error,
  hint,
  ...rest
}: TextareaProps) {
  return (
    <FieldWrapper
      label={label}
      htmlFor={htmlFor}
      required={required}
      error={error}
      hint={hint}
    >
      <textarea
        id={htmlFor}
        className="field min-h-[120px]"
        required={required}
        aria-invalid={!!error}
        {...rest}
      />
    </FieldWrapper>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  Omit<WrapperProps, "children"> & { children: ReactNode };

export function SelectField({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  ...rest
}: SelectProps) {
  return (
    <FieldWrapper
      label={label}
      htmlFor={htmlFor}
      required={required}
      error={error}
      hint={hint}
    >
      <select
        id={htmlFor}
        className="field"
        required={required}
        aria-invalid={!!error}
        {...rest}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}

export function CheckboxField({
  id,
  label,
  required,
  error,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          required={required}
          aria-invalid={!!error}
          className="mt-1 h-4 w-4 rounded border-ink-300 text-forest-700 focus:ring-forest-300"
          {...rest}
        />
        <label htmlFor={id} className="text-sm text-ink-700">
          {label}
          {required && <span className="ml-0.5 text-amber-600"> *</span>}
        </label>
      </div>
      {error && (
        <p className="field-error ml-7" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
