import { Schema } from "@/server/entities";

export type ValidationMessage = {
  status: boolean;
  message:
    | {
        missingFields?: string[];
        invalidFields?: string[];
        invalidTypes?: { [key: string]: string }[];
      }
    | string;
};

const validate = async (
  obj: any,
  model: Schema,
  isPartial: boolean
): Promise<ValidationMessage> => {
  const missingKeys = Object.keys(model.fields).filter((key) => !(key in obj));
  const invalidKeys = Object.keys(obj).filter((key) => !(key in model.fields));

  const invalidTypes: { [key: string]: string }[] = Object.keys(model.fields)
    .filter((key) => key in obj)
    .reduce((acc, key) => {
      if (typeof obj[key] !== model.fields[key]) {
        if (acc.length === 0) {
          acc.push({});
        }
        acc[0][key] = model.fields[key];
      }
      return acc;
    }, [] as { [key: string]: string }[]);

  if (
    (!isPartial && missingKeys.length > 0) ||
    invalidKeys.length > 0 ||
    invalidTypes.length > 0
  ) {
    return {
      status: false,
      message: {
        ...(!isPartial && missingKeys.length > 0
          ? { missingFields: missingKeys }
          : {}),
        ...(invalidKeys.length > 0 && { invalidFields: invalidKeys }),
        ...(invalidTypes.length > 0 && { invalidTypes: invalidTypes }),
      },
    };
  }

  return {
    status: true,
    message: "Valid",
  };
};

export default validate;
