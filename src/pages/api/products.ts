import type { NextApiRequest, NextApiResponse } from "next";
import ProductService from "@/application/services/products";
import { Product, ProductSchema } from "@/application/entities";
import validate from "@/validation/validator";
import ptbrValidationParser from "@/validation/ptbr-parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | {
    data: Product[],
    totalCount: number,
    totalPages: number,
    currentPage: number,
  } | { error: object | string } | { success: string }>
) {
  const productService = new ProductService();

  const { method, body, query } = req;

  try {
    switch (method) {
      case "GET":
        const id = query.id as string;
        if (id) {
          const product = await productService.findById(id) as Product;
          if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
          }
          return res.json(product);
        }
        const take = parseInt(query.take as string) || 5;
        const skip = parseInt(query.skip as string) || 0;
        const products = await productService.findMany(skip, take) as {
          data: Product[],
          totalCount: number,
          totalPages: number,
          currentPage: number,
        };
        return res.json(products);

      case "POST":
        if (!body) {
          return res.status(400).json({ error: "Corpo da requisição vazio" });
        }
        const createValidation = await validate(body, ProductSchema, false);
        if (!createValidation.status) {
          const errorMessage = ptbrValidationParser(createValidation);
          return res.status(400).json({ error: errorMessage });
        }
        const newProduct = await productService.create(body);
        return res
          .status(201)
          .json({ success: `Produto "${newProduct.name}" criado com sucesso.` });

      case "PUT":
        if (!body) {
          return res.status(400).json({ error: "Corpo da requisição vazio." });
        }
        if (!query.id) {
          return res.status(400).json({ error: "ID do produto não informado." });
        }
        const updateValidation = await validate(body, ProductSchema, true);
        if (!updateValidation.status) {
          const errorMessage = ptbrValidationParser(updateValidation);
          return res.status(400).json({ error: errorMessage });
        }
        const updatedProduct = await productService.update(query.id as string, body) as Product;
        return res
          .status(200)
          .json({ success: `Produto "${updatedProduct.name}" atualizado.` });

      case "DELETE":
        if (!query.id) {
          return res.status(400).json({ error: "ID não informado." });
        }
        await productService.delete(query.id as string);
        return res.status(204).json({ success: `Produto com id ${query.id} deletado com sucesso.` });

      default:
        return res.status(405).json({ error: "Método não permitido." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}