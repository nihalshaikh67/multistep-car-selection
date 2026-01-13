export function ToggleGroup({ id, label, options, selected, onSelect }) {
  return (
    <div className="space-y-2" id={id}>
      <p className="font-medium">{label}</p>
      <div className="flex gap-2">
        {options.map((option) => {
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={
                selected === option
                  ? "px-4 py-2 text-black border rounded bg-blue-300 border-black-500"
                  : "px-4 py-2 border rounded border-gray-300"
              }
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
