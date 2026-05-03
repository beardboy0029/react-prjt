import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "formik";
import dayjs from "dayjs";
import calendar from "../../assets/svg/calander.svg";

const FormDates = ({
  label,
  name,
  minDate,
  maxDate,
  disabled = false,
  required = false,
  onChange,
  placeholder,
  format,
  border = true,
}) => {
  const [field, meta, helpers] = useField(name);

  const dateValue = field.value ? dayjs(field.value) : null;
  const minDayjs = minDate ? dayjs(minDate) : undefined;
  const maxDayjs = maxDate ? dayjs(maxDate) : undefined;

  const showBorder = border !== false && border !== "false";

  const handleChange = (newValue) => {
    const isoDate = newValue ? newValue.toISOString() : null;
    helpers.setValue(isoDate);
    helpers.setTouched(true);
    if (onChange) onChange(isoDate);
  };

  const CalendarIcon = () => (
    <img src={calendar} alt="calendar" className="w-5 h-5" />
  );

  const displayPlaceholder = placeholder || "Day, DD-MMM-YYYY";

  return (
    <div className="relative w-full">
      {label && (
        <label
          className="block text-sm font-medium text-foreground"
          style={{ fontFamily: "CircularStd-book" }}
        >
          {label}
          {required && <span className="text-blue-500">*</span>}
        </label>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dateValue}
          onChange={handleChange}
          minDate={minDayjs}
          maxDate={maxDayjs}
          format={format}
          slots={{ openPickerIcon: CalendarIcon }}
          disabled={disabled}
          slotProps={{
            textField: {
              placeholder: displayPlaceholder,
              fullWidth: true,
              variant: "standard",
              onBlur: () => helpers.setTouched(true),
              sx: {
                "& .MuiPickersSectionList-sectionContent": {
                },
                "& .MuiInputBase-root": {
                },
                "& .MuiInputBase-input": {
                  opacity: "1 !important",
                  color: "currentColor",
                  WebkitTextFillColor: "currentColor",
                },
                "& input": {
                  "&::placeholder": {
                    color: "#6b7280",
                    opacity: 1,
                  },
                },
              },
              InputProps: {
                disableUnderline: true,
                className: `
                  w-full bg-input rounded-md
                  h-9 pl-2 px-2
                  flex items-center
                  text-sm text-primary1
                  transition-all duration-200

                  ${
                    showBorder
                      ? "border border-border focus-within:border-[var(--border-focus)]"
                      : "!border-transparent focus-within:!border-transparent !shadow-none"
                  }
                `,
              },
              inputProps: {
                className:
                  "h-full flex-1 bg-transparent focus:outline-none placeholder:text-muted-foreground text-foreground",
                placeholder: displayPlaceholder,
                style: { padding: 0 },
              },
            },
            popper: {
              placement: "bottom-start",
              sx: {
                "& .MuiTypography-root, & .MuiPickersDay-root, & .MuiButton-root, & .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel":
                  {
                  },
                "& .MuiPickersArrowSwitcher-button": {
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#e5e7eb",
                    borderRadius: "4px",
                  },
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  fontSize: "12px",
                  color: "#6b7280",
                  width: "32px",
                  margin: "0 2px",
                },
                "& .MuiPickersDay-root": {
                  fontSize: "13px",
                  width: "32px",
                  height: "32px",
                  margin: "1px 2px",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#eff6ff",
                  },
                  "&.Mui-selected": {
                    backgroundColor:
                      "var(--color-primary, #3b82f6) !important",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor:
                        "var(--color-primary-dark, #2563eb) !important",
                    },
                  },
                  "&.MuiPickersDay-today": {
                    border: "1px solid var(--color-primary, #3b82f6)",
                    backgroundColor: "transparent",
                    "&:not(.Mui-selected)": {
                      color: "var(--color-primary, #3b82f6)",
                    },
                  },
                },
                "& .MuiPickersDay-dayOutsideMonth": {
                  color: "#d1d5db",
                  opacity: 0.5,
                },
                "& .MuiButton-root": {
                  textTransform: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  "&.MuiButton-text": {
                    color: "#6b7280",
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                    },
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      {meta.touched && meta.error && (
        <p className="text-xs text-red-500 absolute top-full left-0">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormDates;