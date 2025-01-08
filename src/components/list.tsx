import { ProductApi } from "@/api/product-api";
import { Product } from "@/application/entities";
import Button from "@/components/button";
import ListItem from "@/components/listItem";
import { useEffect, useState } from "react";

interface ListMedatata {
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

function ProductList() {
  const [productList, setProductList] = useState<(Product & { id: string })[]>([]);
  const [listMetadata, setListMetadata] = useState<ListMedatata>();
  const [pagination, setPagination] = useState([5, 0]);

  const productApi = new ProductApi();

  useEffect(() => {
    async function loadProducts() {

      const response = await productApi.getAll(pagination[0], pagination[1]);
      setListMetadata({
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      });
      const data = (await response.data) as (Product & { id: string })[];
      setProductList(data);
    }
    loadProducts();
  }, [pagination]);

  const handleNextPage = () => {
    const newPagination = [pagination[0], pagination[1] + 5];
    setPagination(newPagination);
  };

  const handlePreviousPage = () => {
    const newPagination = [pagination[0], pagination[1] - 5];
    setPagination(newPagination);
  };

  return (
    <div className="container mx-auto max-w-screen-md p-4 border-black border border-opacity-50 rounded">
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
          {listMetadata && listMetadata.currentPage > 1 ? (
            <Button name="Anterior" onClick={handlePreviousPage} color="blue" />
          ) : (
            <Button name="Anterior" color="gray" />
          )}
          {listMetadata &&
          listMetadata.currentPage < listMetadata.totalPages ? (
            <Button name="Próximo" onClick={handleNextPage} color="blue" />
          ) : (
            <Button name="Próximo" color="gray" />
          )}
          {listMetadata && (
            <span>
              Página {listMetadata.currentPage} de {listMetadata.totalPages}
            </span>
          )}
        </div>
        <Button name="Adicionar" redirectTo="/novo-produto" color="blue" />
      </div>

      <div className="flex flex-col gap-2 bg-gray-100 p-1 sm:p-3 md:p-4 rounded">
        <ListItem id="" name="Nome do produto" price="Preço" header />

        {productList.length > 0 ? (
          productList.map((product, index) => {
            return (
              <ListItem id={product.id} key={index} name={product.name} price={product.price} />
            );
          })
        ) : (
          <>
            <div className="flex justify-center">
              <span>
                Nenhum produto cadastrado. Você pode começar{" "}
                <a className="font-medium" href="/novo-produto">
                  adicionando um produto.
                </a>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
