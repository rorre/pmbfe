import ky, { HTTPError } from "ky";
import { defaultStore, urlAtom } from "./atoms";
import { BaseResponse } from "./types";
import toast from "react-hot-toast";

type RequestFnArguments = Parameters<typeof ky>;

export async function doApi<T>(
  url: RequestFnArguments[0],
  options: RequestFnArguments[1],
  notify?: boolean
) {
  let toastId: string = "";
  if (notify) toastId = toast.loading("Running...");

  try {
    const response = await ky(url, {
      ...options,
      prefixUrl: defaultStore.get(urlAtom),
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("authToken") ?? "null"
        )}`,
      },
    }).json<BaseResponse<T>>();

    if (notify) toast.success(response.message ?? "Success", { id: toastId });
    return response;
  } catch (err) {
    let message = "Unknown error, failed. See developer tools.";
    if (err instanceof HTTPError) {
      const errorJson: BaseResponse<never> = await err.response.json();
      if (errorJson.message) message = errorJson.message;
    }

    if (notify) toast.error(message, { id: toastId });
    throw err;
  }
}

export const get = <T>(...args: RequestFnArguments) =>
  doApi<T>(args[0], {
    ...args[1],
    method: "GET",
  });

export const post = <T>(...args: RequestFnArguments) =>
  doApi<T>(
    args[0],
    {
      ...args[1],
      method: "POST",
    },
    true
  );
