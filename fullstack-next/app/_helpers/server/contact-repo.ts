import log from "_utilities/log";
import { db } from "./mongodb";
import { ContactRequest } from "_types";

const ContactRequestModel = db.ContactRequest;

export const contactRepo = {
  create,
  getAllLatest,
};

async function create(params: ContactRequest) {
  const contactRequest = new ContactRequestModel(params);
  await contactRequest.save();
}

async function getAllLatest() {
  return await ContactRequestModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  )
    .sort({ _id: -1 })
    .lean();
}
