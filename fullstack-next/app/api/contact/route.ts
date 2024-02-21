import joi from "joi";
import { apiHandler } from "_helpers/server/api";
import log from "_utilities/log";
import { contactRepo } from "_helpers/server";

module.exports = apiHandler({
  POST: contact,
  GET: getAllLatest,
});

async function contact(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, message } = body;

  if (!firstName || !lastName || !email || !message) {
    // A bit redundant with joi as well, but it's a good practice to validate the input
    throw new Error(
      "Invalid input, missing required fields in body of request."
    );
  }

  await contactRepo.create({ firstName, lastName, email, message });

  log("Contact request received and saved successfully from: " + email);
}

async function getAllLatest(req: Request) {
  return await contactRepo.getAllLatest();
}

contact.schema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required(),
  message: joi.string().required(),
});
