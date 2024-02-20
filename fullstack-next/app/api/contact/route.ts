import joi from "joi";
import { apiHandler } from "_helpers/server/api";
import log from "_utilities/log";

module.exports = apiHandler({
  POST: contact,
});

async function contact(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  log("some log message here");

  return ""; // Return only a json
}

contact.schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  message: joi.string().required(),
});
