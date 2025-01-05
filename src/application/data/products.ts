import Crud from "./crud";
import { prisma } from "@/infra/database/client";
import { Product } from "@/application/entities";


export default class ProductsCrud extends Crud<Product> {
    constructor() {
        super(prisma.product);
    }
}
