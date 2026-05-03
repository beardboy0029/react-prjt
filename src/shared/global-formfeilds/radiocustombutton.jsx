import React from "react";
import { useFormikContext } from "formik";

const FormSelectableGroup = ({
  label,
  name,
  options,
  multiple = false,
  disabled = false,
  required,
  onChange,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const value = values?.[name];

  const handleChange = (optionValue) => {
    if (multiple) {
      const current = value || [];
      const newValues = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];

      setFieldValue(name, newValues);
      if (onChange) onChange(newValues);
    } else {
      setFieldValue(name, optionValue);
      if (onChange) onChange(optionValue);
    }
  };

  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div>
      {label && <label className="block mb-2 font-medium">{label}</label>}

      <div className="flex flex-wrap gap-[45px] max-h-[96px] overflow-y-auto pr-2">
        {options.map((opt) => {
          const checked = isSelected(opt.value);

          return (
            <label
              key={String(opt.value)}
              className={`flex items-center gap-1 cursor-pointer select-none ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                checked={checked}
                onChange={() => handleChange(opt.value)}
                disabled={disabled}
                required={
                  required && (!value || (multiple && value.length === 0))
                }
                className="sr-only"
              />

              <div
                className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${
                  checked
                    ? "border-primary"
                    : "border-gray-400 hover:border-gray-600"
                }`}
              >
                {checked && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>

              <span
                className={`text-sm ${
                  checked ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FormSelectableGroup;