import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
  id?: string;
}

const Slider = ({ 
  min, 
  max, 
  step, 
  value, 
  onValueChange, 
  className,
  id
}: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseInt(e.target.value)]);
  };

  const percentage = ((value[0] - min) / (max - min)) * 100;

  return (
    <div className={cn("relative w-full", className)}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div 
        className="absolute top-0 left-0 h-2 bg-blue-500 rounded-lg pointer-events-none"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export { Slider };