# DatePicker Usage Example

## How to use the DatePicker component

```tsx
import { DatePicker } from "@/components/DatePicker";

// In your form component:
<Controller
  name="dateOfBirth"
  control={control}
  render={({ field }) => (
    <DatePicker
      label={t("dateOfBirth")}
      value={field.value}
      onChange={field.onChange}
      error={!!errors.dateOfBirth}
      helperText={errors.dateOfBirth?.message}
    />
  )}
/>
```

## Features
- Automatically switches between Arabic and English months based on current language
- Saves date in Redux store as YYYY-MM-DD format
- Shows calendar in DD/MM/YYYY format for display
- Includes error handling and validation support
```