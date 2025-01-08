import { ProductApi } from "@/api/product-api";
import { Product } from "@/application/entities";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./button";
import { useEffect, useState } from "react";
import ToastMessageHandler from "./toast-message-handler";
import parseStringToBoolean from "@/helpers/parseStringToBoolean";

interface FormProps {
  type: "create" | "edit";
  product?: Product & { id: string };
}

export default function Form({ type, product }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  const productApi = new ProductApi();

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setIsLoading(true);
    const { name, description, price, isAvailable } = data as Product;

    const productData = {
      name,
      description,
      price: parseInt(price as unknown as string),
      isAvailable: parseStringToBoolean(isAvailable) as boolean,
    };

    if (type === "create") {
      const response = (await productApi.create(
        productData
      )) as unknown as Response;
      ToastMessageHandler({ response, setIsLoading });
    }
    if (type === "edit") {
      const id = product?.id as string;
      const response = (await productApi.update(
        id,
        productData
      )) as unknown as Response;
      ToastMessageHandler({ response, setIsLoading });
    }
  };

  useEffect(() => {
    if (type === "edit" && product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
    }
  }, [type, product, setValue]);
  return (
    <div className="max-w-md mx-auto md:max-w-xs md:mx-auto">
      <h1 className="text-center font-medium">{
        type === "create"? "Novo Produto" : "Editar Produto"
        }</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Nome do produto
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm h-0 mb-2">
              Esse campo é obrigatório.
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.description && (
            <span className="text-red-500 text-sm h-0 mb-2">
              Esse campo é obrigatório.
            </span>
          )}
        </div>
        <div className="flex flex-col relative">
          {" "}
          <label htmlFor="price" className="text-sm font-medium mb-1">
            Preço
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
            className="rounded-md border border-gray-300 px-7 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            style={{ appearance: "textfield" }}
          />
          <span className="absolute left-3 top-1/2  text-gray-400 pointer-events-none">
            $
          </span>{" "}
          {errors.price && (
            <span className="text-red-500 text-sm h-0 mb-2">
              Esse campo é obrigatório.
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="isAvailable" className="text-sm font-medium mb-1">
            Está disponível?
          </label>
          <select
            id="isAvailable"
            {...register("isAvailable", { required: true })}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Selecione</option>
            <option value={"true"}>Sim</option>
            <option value={"false"}>Não</option>
          </select>
          {errors.isAvailable && (
            <span className="text-red-500 text-sm h-0 mb-2">
              Esse campo é obrigatório.
            </span>
          )}
        </div>
        {isLoading ? (
          <Button disabled name="Enviar" type="submit" color="gray"></Button>
        ) : (
          <Button name="Enviar" type="submit" color="blue"></Button>
        )}
      </form>
    </div>
  );
}
