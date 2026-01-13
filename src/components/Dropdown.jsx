const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label className="font-medium">{label}</label>
      <select
        className="border p-2 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
