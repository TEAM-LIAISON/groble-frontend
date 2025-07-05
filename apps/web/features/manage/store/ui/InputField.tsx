/**
 * 입력 필드 컴포넌트
 */
interface InputFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'url';
  description?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({
  label,
  placeholder,
  required = false,
  type = 'text',
  description,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1 text-body-1-semibold text-label-normal">
        {label}
        {required && <span className="text-system-error">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-line-normal rounded-lg 
                   focus:border-primary-normal focus:outline-none
                   placeholder:text-label-alternative"
      />
      {description && (
        <p className="text-body-3-normal text-label-alternative">
          {description}
        </p>
      )}
    </div>
  );
}
