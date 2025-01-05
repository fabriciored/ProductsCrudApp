import { Product } from "@/application/entities";
import ProductsCrud from "@/application/data/products";

export default class ProductService {

    private crud: ProductsCrud;

    constructor() {
        this.crud = new ProductsCrud();
    }

    async findMany() {
        return await this.crud.findMany();
    }

    async findById(id: string) {
        const product = await this.crud.findById(id);
        if (!product) {
            return { error: `Product not found with id: ${id}` };
        }
        return product;
    }

    async create(data: Product) {
        return await this.crud.create(data);
    }

    async update(id: string, data: Product) {
        const product = await this.crud.findById(id);
        if (!product) {
            return { error: `Product not found with id: ${id}` };
        }
        return await this.crud.update(id, data);
    }

    async delete(id: string) {
        const product = await this.crud.findById(id);
        if (!product) {
            return { error: `Product not found with id: ${id}` };
        }
        return await this.crud.delete(id);
    }

}