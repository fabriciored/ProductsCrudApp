import { Product } from "@/application/entities";
import ProductsCrud from "@/application/data/products";

export default class ProductService {

    private crud: ProductsCrud;

    constructor() {
        this.crud = new ProductsCrud();
    }

    async findMany(skip: number, take: number): Promise<{
        data: Product[],
        totalCount: number,
        totalPages: number,
    }> {
        return await this.crud.findMany(skip, take);
    }

    async findById(id: string): Promise<Product | { message: string }> {
        const product = await this.crud.findById(id);
        if (!product) {
            return { message: `Produto com id ${id} não encontrado` };
        }
        return product;
    }

    async create(data: Product): Promise<Product> {
        return await this.crud.create(data);
    }

    async update(id: string, data: Product): Promise<Product | { message: string }> {
        const product = await this.crud.findById(id);
        if (!product) {
            return { message: `Produto com id ${id} não encontrado` };
        }
        return await this.crud.update(id, data) as Product;
    }

    async delete(id: string): Promise<void | { message: string }> {
        const product = await this.crud.findById(id);
        if (!product) {
            return { message: `Produto com id ${id} não encontrado` };
        }
        return await this.crud.delete(id);
    }

}