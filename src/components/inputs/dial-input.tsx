"use client";
import { useRef, useState } from "react";

export default function DialInput({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 0,
  handleSubmitAction,
}: {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  handleSubmitAction: (val: number) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [valueInput, setValueInput] = useState(String(initialValue));

  const dialRef = useRef<HTMLDivElement>(null);

  const getAngle = (x: number, y: number, cx: number, cy: number) => {
    const dx = x - cx;
    const dy = y - cy;
    const rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    return deg;
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = getAngle(e.clientX, e.clientY, cx, cy);
    const percent = angle / 360;
    const newValue = Math.round((min + percent * (max - min)) / step) * step;
    setValue(Math.min(max, Math.max(min, newValue)));
  };

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", stopDrag);
  };

  const stopDrag = () => {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", stopDrag);
  };

  const rotation = ((value - min) / (max - min)) * 360;

  const handleInputConfirm = () => {
    const parsed = parseInt(valueInput.trim());
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      setValue(clamped);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111]">
      <div
        className="w-[200px] h-[200px] bg-gradient-to-br from-[#2c2c2c] to-[#111] 
      flex justify-center items-center rounded-full"
        style={{
          boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          ref={dialRef}
          onPointerDown={startDrag}
          className="relative w-[180px] h-[180px] rounded-full 
        bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a]
        shadow-[inset_6px_6px_14px_#050505,inset_-6px_-6px_14px_#222] 
        cursor-pointer"
        >
          {/* Glow ring (optional enhancement) */}
          <div className="absolute inset-0 rounded-full ring-1 ring-[#ff0055]/60 shadow-[0_0_8px_rgba(255,00,85,0.3)]" />

          {/* Rotating knob handle */}
          <div
            style={{ transform: `rotate(${rotation}deg)` }}
            className="absolute w-full h-full"
          >
            <div
              className="absolute top-[10px] left-1/2 w-[30px] h-[10px] bg-white 
            rounded-full -translate-x-1/2 shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            />
          </div>

          {isEditing ? (
            <input
              autoFocus
              inputMode="numeric"
              type="text"
              value={String(valueInput)}
              onChange={(e) => setValueInput(e.target.value)}
              onBlur={handleInputConfirm}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputConfirm();
                if (e.key === "Escape") {
                  setValueInput(String(value)); // revert to last value
                  setIsEditing(false);
                }
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      text-white text-center text-3xl bg-transparent border-none outline-none font-black w-[80px] 
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          ) : (
            <>
              <div
                onDoubleClick={() => {
                  setValueInput(String(value));
                  setIsEditing(true);
                }}
                className="absolute top-1/2 left-1/2 -translate-x-[calc(50%-1px)] -translate-y-[calc(50%-1px)] 
        text-[#ff0055]/30 blur-sm font-black text-3xl select-none"
              >
                {value}
              </div>
              <div
                onDoubleClick={() => {
                  setValueInput(String(value));
                  setIsEditing(true);
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        text-white font-black text-3xl cursor-pointer select-none"
              >
                {value}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <button
        onClick={() => {
          setIsSubmitting(true);
          handleSubmitAction(value);
          setIsSubmitting(false);
        }}
        disabled={isSubmitting}
        className="cursor-pointer mt-2 px-5 py-2 rounded-full text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300 ease-in-out disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
