export default function FormField({
  label,
  icon = "",
  type,
  value,
  required,
  onChange,
  placeholder = "",
  className = "w-full px-3 py-2 pl-10 text-primary-200 bg-primary-700 border border-primary-600 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500",
}) {
  return (
    <div>
      <label htmlFor="name" className="text-sm font-medium text-primary-200">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={label}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
