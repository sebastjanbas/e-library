import { useState } from "react";
import { BookCategories } from "@/lib/docs";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function CategoryInput({
  field,
  placeholder,
  disabled,
}: {
  field: { value: string; onChange: (val: string) => void };
  placeholder?: string;
  disabled?: boolean;
}) {
  const [input, setInput] = useState(field?.value ?? "");
  const [showOptions, setShowOptions] = useState(false);

  const trimmedInput = input.trim();
  const filtered = BookCategories.filter((cat) =>
    cat.toLowerCase().includes(trimmedInput.toLowerCase()),
  );

  const isCustomValue =
    trimmedInput.length > 0 &&
    !BookCategories.some(
      (cat) => cat.toLowerCase() === trimmedInput.toLowerCase(),
    );

  return (
    <div className="relative w-[200px]">
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              // Exact match? Select it
              const exactMatch = BookCategories.find(
                (cat) => cat.toLowerCase() === trimmedInput.toLowerCase(),
              );

              // Otherwise, pick first suggestion
              const toSelect = exactMatch ?? filtered[0] ?? trimmedInput;

              field.onChange(toSelect);
              setInput(toSelect);
              setShowOptions(false);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-8"
        />
        <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>

      {showOptions && (filtered.length > 0 || isCustomValue) && (
        <ul className="absolute top-full mt-1 z-50 w-full bg-white border border-border rounded-md shadow-md text-sm max-h-40 overflow-y-auto">
          {filtered.map((cat, i) => (
            <li
              key={i}
              className={cn(
                "px-3 py-2 hover:bg-muted cursor-pointer flex justify-between items-center",
                cat === field?.value && "bg-muted/50 font-medium",
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                field.onChange(cat);
                setInput(cat);
                setShowOptions(false);
              }}
            >
              {cat}
              {cat === field?.value && <Check className="w-4 h-4" />}
            </li>
          ))}
          {isCustomValue && (
            <li
              className="px-3 py-2 text-muted-foreground hover:bg-muted cursor-pointer flex items-center gap-2"
              onMouseDown={(e) => {
                e.preventDefault();
                field.onChange(trimmedInput);
                setInput(trimmedInput);
                setShowOptions(false);
              }}
            >
              <Plus className="w-4 h-4" />
              Use “{trimmedInput}”
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
