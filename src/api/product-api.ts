import { Product } from "@/application/entities";
import { ApiService } from "./service/api-service";

export class ProductApi extends ApiService<Product> {
    constructor() {
        super("/api/products/");
    }
}