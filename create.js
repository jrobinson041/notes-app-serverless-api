import uuid from "uuid";
import { Notes } from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import { parseEvent } from "./libs/event-lib";

export const main = async event => {
  const { content, attachment, userId } = parseEvent(event);

  const note = {
    userId,
    noteId: uuid.v1(),
    content,
    attachment,
    createAt: Date.now()
  };

  try {
    await Notes.put(note);
    return success(note);
  } catch (err) {
    return failure({ status: false });
  }
};
