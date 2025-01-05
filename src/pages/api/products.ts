import type { NextApiRequest, NextApiResponse } from "next";
import ProductService from "@/application/services/products";
import { Product, ProductSchema } from "@/application/entities";
import validate from "@/validation/validator";
import ptbrValidationParser from "@/validation/ptbr-parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Product[] | { message: object | string }>
) {
  const productService = new ProductService();

  const { method, body, query } = req;

  try {
    switch (method) {
      case "GET":
        const id = query.id as string;
        if (id) {
          const product = await productService.findById(id);
          if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
          }
          return res.json(product);
        }
        const products = await productService.findMany();
        return res.json(products);

      case "POST":
        if (!body) {
          return res.status(400).json({ message: "Corpo da requisição vazio" });
        }
        const createValidation = await validate(body, ProductSchema, false);
        if (!createValidation.status) {
          const errorMessage = ptbrValidationParser(createValidation);
          return res.status(400).json({ message: errorMessage });
        }
        const newProduct = await productService.create(body);
        return res
          .status(201)
          .json({ message: `Produto ${newProduct.name} criado` });

      case "PUT":
        if (!body) {
          return res.status(400).json({ message: "Corpo da requisição vazio." });
        }
        if (!query.id) {
          return res.status(400).json({ message: "ID não informado." });
        }
        const updateValidation = await validate(body, ProductSchema, true);
        if (!updateValidation.status) {
          const errorMessage = ptbrValidationParser(updateValidation);
          return res.status(400).json({ message: errorMessage });
        }
        const updatedProduct = await productService.update(query.id as string, body) as Product;
        return res
          .status(200)
          .json({ message: `Produto ${updatedProduct.name} atualizado.` });

      case "DELETE":
        if (!query.id) {
          return res.status(400).json({ message: "ID não informado" });
        }
        await productService.delete(query.id as string);
        return res.status(204).json({ message: `Produto com id ${query.id} deletado.` });

      default:
        return res.status(405).json({ message: "Método não permitido" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}