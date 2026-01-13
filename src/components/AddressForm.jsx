import { ADDRESS_FIELDS } from "../constants/car";

import { ToggleGroup } from "./ToggleGroup";

export const AddressForm = ({ address, onChange }) => {
  const maskSSN = (value = "") => {
    if (value.length <= 3) return value;
    return `xxxx-xxx-${value.slice(-3)}`;
  };

  return (
    <div className="space-y-3">
      {ADDRESS_FIELDS.map((field) => (
        <input
          key={field}
          placeholder={field.toUpperCase()}
          className="border placeholder:lowercase p-2 w-full"
          value={address[field]}
          onChange={(e) => onChange(field, e.target.value)}
        />
      ))}

      <input
        placeholder="SSN (10 digits)"
        className="border p-2 w-full"
        value={maskSSN(address.ssn)}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/\D/g, "");
          if (rawValue.length <= 10) {
            onChange("ssn", rawValue);
          }
        }}
        inputMode="numeric"
        autoComplete="off"
      />

      {address.state === "FL" && (
        <ToggleGroup
          id="filter-alarm-toggle"
          label="Do you have Fire Alarm?"
          options={["Yes", "No"]}
          selected={address.fireAlarm}
          onSelect={(v) => onChange("fireAlarm", v)}
        />
      )}
    </div>
  );
};
