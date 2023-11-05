// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import joi from "joi";

export async function validateMiddleware(
  req: Request,
  schema: joi.ObjectSchema
) {
  if (!schema) return;

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const body = await req.json();
  const { error, value } = schema.validate(body, options);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(", ")}`;
  }

  // update req.json() to return sanitized req body
  req.json = () => value;
}
