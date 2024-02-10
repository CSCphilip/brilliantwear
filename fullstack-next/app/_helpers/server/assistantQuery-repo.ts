import log from "_utilities/log";
import { db } from "./mongodb";

const AssistantQuery = db.AssistantQuery;

export const assistantQueryRepo = {
  create,
  getAll,
};

async function create(params: any) {
  const assistantQuery = new AssistantQuery(params);
  await assistantQuery.save();
  log("User input query to shopping assistant saved successfully.");
}

async function getAll() {
  return await AssistantQuery.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  ).lean();
}
