import { SetStateAction } from "react";
import { toast } from "react-toastify";

interface ToastMessageHandlerProps {
    response: Response;
    setIsLoading: (value: SetStateAction<boolean>) => void;
}

function ToastMessageHandler({response, setIsLoading}: ToastMessageHandlerProps) {
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
          setIsLoading(false);
        }
        if ("success" in response) {
          toast.success(response.success as string)
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
}

export default ToastMessageHandler