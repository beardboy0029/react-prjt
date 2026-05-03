import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";

const FormInput = ({
  label,
  hint,
  required,
  onChange,
  border = true,
  ...props
}) => {
  const [field, meta] = useField({ name: props.name, type: props.type });
  const [isFieldsetDisabled, setIsFieldsetDisabled] = useState(false);
  const inputRef = useRef(null);

  // Handle both false and "false"
  const showBorder = border !== false && border !== "false";

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const fieldset = el.closest("fieldset");
    if (!fieldset) return;

    setIsFieldsetDisabled(fieldset.disabled);

    const observer = new MutationObserver(() => {
      setIsFieldsetDisabled(fieldset.disabled);
    });

    observer.observe(fieldset, {
      attributes: true,
      attributeFilter: ["disabled"],
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-blue-500">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        {...field}
        {...props}
        autoComplete="off"
        value={field.value ?? ""}
        onChange={handleChange}
        className={`
          w-full rounded-md px-1.5 py-2 text-sm
          text-primary1 placeholder:text-muted-foreground
          transition-all duration-200
          
          ${showBorder
            ? "border border-border focus:border-[var(--border-focus)] focus:outline-none"
            : "!border-transparent !ring-0 !outline-none !shadow-none !bg-transparent"
          }

          ${props.disabled
            ? "opacity-50 cursor-not-allowed !bg-gray-100"
            : isFieldsetDisabled
              ? "cursor-not-allowed !bg-input"
              : showBorder
                ? "bg-input"
                : ""
          }
        `}
      />

      {hint && typeof hint === "string" && (
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      )}

      {meta.touched && meta.error && typeof meta.error === "string" && (
        <p className="text-xs text-red-500 absolute top-full left-0 mt-0.5">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormInput;