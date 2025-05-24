import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface PinInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const PinInput: React.FC<PinInputProps> = ({
  length,
  value,
  onChange,
  isError = false,
  autoFocus = false,
  className,
}) => {
  const [pins, setPins] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update pins when value changes from parent
  useEffect(() => {
    if (value) {
      const pinArray = value.split("").slice(0, length);
      const filledPins = [...pinArray, ...new Array(length - pinArray.length).fill("")];
      setPins(filledPins);
    } else {
      setPins(new Array(length).fill(""));
    }
  }, [value, length]);

  // Handle change in each input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    // Only allow numbers
    if (val && !/^\d*$/.test(val)) {
      return;
    }
    
    // Take only the last character if multiple are pasted
    const digit = val.slice(-1);
    
    // Update pins state
    const newPins = [...pins];
    newPins[index] = digit;
    setPins(newPins);
    
    // Update parent value
    onChange(newPins.join(""));
    
    // Move to next input if a digit was entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste across inputs
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Check if pasted data contains only numbers
    if (!/^\d*$/.test(pastedData)) {
      return;
    }
    
    const pastedArray = pastedData.split("").slice(0, length - index);
    const newPins = [...pins];
    
    let lastFilledIndex = index;
    for (let i = 0; i < pastedArray.length; i++) {
      if (index + i < length) {
        newPins[index + i] = pastedArray[i];
        lastFilledIndex = index + i;
      }
    }
    
    setPins(newPins);
    onChange(newPins.join(""));
    
    // Focus last input or the next empty one
    if (lastFilledIndex < length - 1) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {pins.map((pin, index) => (
        <Input
          key={index}
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          value={pin}
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          autoFocus={autoFocus && index === 0}
          className={`w-12 h-12 text-center text-xl ${isError ? 'border-destructive focus:border-destructive' : ''}`}
          aria-label={`Pin input ${index + 1}`}
        />
      ))}
    </div>
  );
}; 