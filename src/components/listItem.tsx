import { ProductApi } from "@/api/product-api";
import Button from "./button";
import ToastMessageHandler from "./toast-message-handler";
import { useEffect, useState } from "react";

interface ListItemProps {
  id: string;
  name: string;
  price: string | number;
  header?: boolean;
}

function ListItem(props: ListItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const productApi = new ProductApi();

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    const response = (await productApi.delete(id)) as unknown as Response;
    ToastMessageHandler({ response, setIsLoading });
  };

  const editProduct = (productId: string) => {
    window.location.href = `/editar-produto/${productId}`;
  };

  useEffect(() => {}, [isLoading]);

  return (
    <div className="flex flex-row justify-between bg-gray-200 p-2 rounded">
      <div className="flex items-center w-1/3 sm:w-2/4">
        <span
          className={
            props.header
              ? "mx-5 font-medium text-sm sm:text-lg"
              : "mx-5 text-xs sm:text-lg"
          }
        >
          {props.name}
        </span>
      </div>
      <div className="flex items-center w-1/3  sm:w-1/4">
        <span
          className={
            props.header
              ? "mx-5 font-medium text-sm sm:text-lg"
              : "mx-5 text-xs sm:text-lg"
          }
        >
          {props.header ? props.price : "$" + props.price}
        </span>
      </div>
      <div className="flex items-center w-1/3 sm:w-1/4">
        {props.header ? (
          <span className={"mx-5 font-medium text-sm sm:text-lg"}>Ações</span>
        ) : (
          <div className="flex gap-1 sm:gap-2">
            <Button
              key={props.id}
              name="Editar"
              color="blue"
              onClick={() => editProduct(props.id)}
            />
            {isLoading ? (
              <Button key={props.id} name="Deletar" color="gray" disabled />
            ) : (
              <Button
                key={props.id}
                name="Deletar"
                color="red"
                onClick={() => deleteProduct(props.id)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
