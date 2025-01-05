export type Schema = {
  fields: { [key: string]: string };
};

export type Product = {
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
};

export const ProductSchema: Schema = {
  fields: {
    name: "string",
    price: "number",
    description: "string",
    isAvailable: "boolean",
  },
};
