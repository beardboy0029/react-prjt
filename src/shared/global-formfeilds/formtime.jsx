import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField } from "formik";
import dayjs from "dayjs";
import time from "../../assets/svg/time.svg";

const FormTimes = ({
  label,
  name,
  disabled = false,
  required = false,
  onChange,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  const timeValue = field.value ? dayjs(field.value) : null;

  const handleChange = (newValue) => {
    const isoTime = newValue ? newValue.toISOString() : null;
    helpers.setValue(isoTime);
    helpers.setTouched(true);
    if (onChange) onChange(isoTime);
  };

  const ClockIcon = () => (
    <img src={time} alt="clock" className="w-5 h-5" />
  );

  const fontStyle = "CircularStd-book, sans-serif !important";
  const displayPlaceholder = placeholder || "hh:mm A";

  return (
    <div className="relative w-full">
      {label && (
        <label
          className="block text-sm font-medium text-foreground"
          style={{ fontFamily: "CircularStd-book, sans-serif" }}
        >
          {label}
          {required && <span className="text-blue-500">*</span>}
        </label>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={timeValue}
          onChange={handleChange}
          disabled={disabled}
          format="hh:mm A"
          inputFormat="hh:mm A"
          ampm={true}
          minutesStep={15}
          slots={{ openPickerIcon: ClockIcon }}
          slotProps={{
            textField: {
              placeholder: displayPlaceholder,
              fullWidth: true,
              variant: "standard",
              InputLabelProps: { shrink: true },
              onBlur: () => helpers.setTouched(true),
              sx: {
                fontFamily: fontStyle,
                "& .MuiPickersSectionList-sectionContent": {
                  fontFamily: fontStyle,
                },
                "& .MuiInputBase-root": {
                  fontFamily: fontStyle,
                },
                "& .MuiInputBase-input": {
                  fontFamily: fontStyle,
                  opacity: "1 !important",
                  color: "currentColor",
                  WebkitTextFillColor: "currentColor",
                },
                "& input": {
                  fontFamily: fontStyle,
                  "&::placeholder": {
                    color: "#6b7280",
                    opacity: 1,
                  },
                },
              },
              InputProps: {
                disableUnderline: true,
                className: `
                  w-full bg-input border border-border rounded-md
                  h-9 pl-2 px-2
                  flex items-center
                  text-sm text-primary1
                  focus-within:border-[var(--border-focus)]
                  transition-all duration-200
                `,
              },
              inputProps: {
                className:
                  "h-full flex-1 bg-transparent focus:outline-none placeholder:text-muted-foreground text-foreground",
                placeholder: displayPlaceholder,
                style: { padding: 0 },
              },
            },
            openPickerButton: {
              style: {
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              },
            },
            popper: {
              placement: "bottom-start",
              sx: {
                fontFamily: fontStyle,

                "& *": {
                  fontFamily: `${fontStyle} !important`,
                },

                "& .MuiMultiSectionDigitalClockSection-item.Mui-disabled": {
                  display: "none !important",
                },

                "& .MuiMultiSectionDigitalClock-sectionItem.Mui-disabled": {
                  display: "none !important",
                },

                "& li.Mui-disabled": {
                  display: "none !important",
                },

                "& .MuiPaper-root": {
                  marginTop: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                },

                "& .MuiMultiSectionDigitalClockSection-root": {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
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

export default FormTimes;