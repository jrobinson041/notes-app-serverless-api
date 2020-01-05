import { parseEvent } from "./libs/event-lib";
import { Notes } from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export const main = async event => {
  const { userId, id, content, attachment } = parseEvent(event);

  try {
    await Notes.update(userId, id, { content, attachment });
    return success({ status: true });
  } catch (err) {
    return failure({ status: false });
  }
};
