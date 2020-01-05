import { Notes } from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import { parseEvent } from "./libs/event-lib";

export const main = async event => {
  const { id, userId } = parseEvent(event);

  try {
    const { Item } = await Notes.get(userId, id);
    return Item
      ? success(Item)
      : failure({ status: false, error: "Item not found" });
  } catch (err) {
    return failure({ status: false });
  }
};
