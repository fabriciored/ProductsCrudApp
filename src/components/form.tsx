import { ProductApi } from "@/api/product-api";
import { Product } from "@/application/entities";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./button";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const productApi = new ProductApi();

  const onSubmit: SubmitHandler<Product> = async (data) => {
    const { name, description, price, isAvailable } = data as Product;
    const parsedIsAvailable = parseStringToBoolean(isAvailable) as boolean;

    const product = {
      name,
      description,
      price: parseInt(price as unknown as string),
      isAvailable: parsedIsAvailable,
    };

    const response = (await productApi.create(product)) as Product;
    if ("error" in response && Array.isArray(response.error)) {
      response.error.map((error: { [key: string]: string }) => {
        Object.keys(error).map((key: string) => {
          const errors = error[key] as unknown as Array<string>;
          toast.error(
            <p>
              {key}: <br />{" "}
              {errors.map((error: string, index: number) => {
                return <p key={index}>{error}</p>;
              })}
            </p>
          );
        });
      });
    }
    if ("success" in response) {
      toast.success(response.success as string)
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  function parseStringToBoolean(
    value: string | null | boolean
  ): boolean | null {
    return typeof value === "boolean"
      ? value
      : value === "true"
      ? true
      : value === "false"
      ? false
      : null;
  }

  return (
    <div className="max-w-md mx-auto md:max-w-xs md:mx-auto">
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
        <Button name="Enviar" type="submit" color="blue"></Button>
      </form>
    </div>
  );
}
