// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { useRouter } from "next/navigation";

export function useFetch() {
  const router = useRouter();

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };

  function request(method: string) {
    return (url: string, body?: any) => {
      const requestOptions: any = {
        method,
      };

      if (body) {
        const formData = new FormData();
        let isFileInBody = false;

        for (const key in body) {
          // It ensures that the property exists directly on the body object itself, not on its prototype chain.
          if (body.hasOwnProperty(key)) {
            if (body[key] instanceof FileList) {
              for (let i = 0; i < body[key].length; i++) {
                formData.append(key, body[key][i]);
              }
              isFileInBody = true;
            } else {
              formData.append(key, body[key]);
            }
          }
        }

        if (isFileInBody) {
          /* NOTE: If you add the following, I get the error: missing boundary but if I remove it, 
           the browser adds it automatically.
           
           requestOptions.headers = {
           "Content-Type": "multipart/form-data",
           };

           */
          requestOptions.body = formData;
        } else {
          requestOptions.headers = {
            "Content-Type": "application/json",
          };
          requestOptions.body = JSON.stringify(body);
        }
      }

      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  async function handleResponse(response: any) {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
      if (response.status === 401) {
        // api auto logs out on 401 Unauthorized, so redirect to login page
        router.push("/account/login");
      }

      // get error message from body or default to response status
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  }
}
