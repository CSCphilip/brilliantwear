// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import joi from "joi";

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export async function validateMiddlewareJSON(
  req: Request,
  schema: joi.ObjectSchema
) {
  if (!schema) return;

  const body = await req.json();
  const { error, value } = schema.validate(body, options);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(", ")}`;
  }

  // update req.json() to return sanitized req body
  req.json = () => value;
}

export async function validateMiddlewareFormData(
  req: Request,
  schema: joi.ObjectSchema
) {
  if (!schema) return;

  const formData = await req.formData();

  // Convert FormData to a plain object
  const formDataObj: any = {};
  formData.forEach((value, key) => (formDataObj[key] = value));

  const { error, value } = schema.validate(formDataObj, options);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(", ")}`;
  }

  const sanitizedFormData = new FormData();
  Object.keys(value).forEach((key) => {
    sanitizedFormData.append(key, value[key]);
  });
  req.formData = async () => sanitizedFormData;
}
