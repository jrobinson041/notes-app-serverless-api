import { parseEvent } from "./libs/event-lib";
import { Notes } from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = async event => {
  const { userId } = parseEvent(event);

  try {
    const { Items } = await Notes.getByUser(userId);
    return success(Items);
  } catch (err) {
    return failure({ status: false });
  }
};
