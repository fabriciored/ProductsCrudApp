import { fieldNamesPTBR, typeNamesPTBR } from "./translation";
import { ValidationMessage } from "./validator";

type ParsedErrorMessage = {
  [key: string]: string[]; 
};

const ptbrValidationParser = (validation: ValidationMessage): ParsedErrorMessage[] => {
  if (typeof validation !== "string") {
    const errorMessages: ParsedErrorMessage = {};

    if (typeof validation.message !== "string" && validation.message.missingFields) {
      errorMessages["Campos faltantes"] = validation.message.missingFields.map((field: string) =>
        `Campo ${fieldNamesPTBR[field as keyof typeof fieldNamesPTBR]} é obrigatório`
      );
    }

    if (typeof validation.message !== "string" && validation.message.invalidFields) {
      errorMessages["Campos inválidos"] = validation.message.invalidFields.map((field: string) =>
        `Campo ${fieldNamesPTBR[field as keyof typeof fieldNamesPTBR] || field} é inválido`
      );
    }

    if (typeof validation.message !== "string" && validation.message.invalidTypes) {
      errorMessages["Tipos inválidos"] = validation.message.invalidTypes.flatMap((field) => {
        const fieldEntries = Object.entries(field);
        return fieldEntries.map(([fieldName, type]) => 
          `Campo ${fieldNamesPTBR[fieldName as keyof typeof fieldNamesPTBR] || fieldName} deve ser do tipo ${typeNamesPTBR[type as keyof typeof typeNamesPTBR]}`
        );
      });
    }

    return [errorMessages]; 
  }

  return []; 
};

export default ptbrValidationParser;