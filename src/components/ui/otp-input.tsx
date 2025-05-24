import * as React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  containerClassName?: string;
  inputClassName?: string;
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  containerClassName,
  inputClassName,
  ...props
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [inputValues, setInputValues] = React.useState<string[]>(Array(length).fill(""));

  // Synchroniser les valeurs d'entrée avec la valeur fournie
  React.useEffect(() => {
    const valueArray = value.split("").slice(0, length);
    const newInputValues = Array(length).fill("");
    
    valueArray.forEach((char, index) => {
      newInputValues[index] = char;
    });
    
    setInputValues(newInputValues);
  }, [value, length]);

  // Gérer les changements d'entrée
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const target = e.target;
    const newValue = target.value;
    const newInputValues = [...inputValues];
    
    // Si l'utilisateur colle un code complet
    if (newValue.length > 1) {
      const pastedValue = newValue.slice(0, length);
      const pastedChars = pastedValue.split("");
      
      for (let i = 0; i < length; i++) {
        if (i < pastedChars.length) {
          newInputValues[i] = pastedChars[i];
        }
      }
      
      setInputValues(newInputValues);
      onChange(newInputValues.join(""));
      
      // Focus sur le dernier champ
      if (inputRefs.current[length - 1]) {
        inputRefs.current[length - 1]?.focus();
      }
      
      return;
    }
    
    // Si l'utilisateur saisit un caractère unique
    if (newValue.length === 1) {
      newInputValues[index] = newValue;
      setInputValues(newInputValues);
      onChange(newInputValues.join(""));
      
      // Focus sur le champ suivant
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Gérer la touche de retour arrière
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !inputValues[index] && index > 0) {
      // Focus sur le champ précédent lorsque vous appuyez sur Backspace dans un champ vide
      const newInputValues = [...inputValues];
      newInputValues[index - 1] = "";
      setInputValues(newInputValues);
      onChange(newInputValues.join(""));
      
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Focus automatique sur le premier champ vide
  React.useEffect(() => {
    const firstEmptyIndex = inputValues.findIndex((val) => !val);
    
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      // Pour éviter les problèmes en mode strict React, utilisons un timeout
      setTimeout(() => {
        inputRefs.current[firstEmptyIndex]?.focus();
      }, 0);
    }
  }, []);

  return (
    <div className={cn("flex items-center gap-2", containerClassName)} {...props}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={inputValues[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            "w-10 h-12 text-center border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary",
            "text-xl font-semibold",
            inputClassName
          )}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
} 