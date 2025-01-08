import { ProductApi } from "@/api/product-api";
import { Product } from "@/application/entities";
import Form from "@/components/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditarProduto() {
  const router = useRouter();

  const productApi = new ProductApi();

  const [product, setProduct] = useState<Product & { id: string }>();

  useEffect(() => {
    async function loadProduct() {
      const response = (await productApi.getById(
        router.query.id as string
      )) as Product & { id: string };
      setProduct(response);
    }
    loadProduct();
  }, [router.query.id]);

  return (
    <div>
      <Form type="edit" product={product}/>
    </div>
  );
}
