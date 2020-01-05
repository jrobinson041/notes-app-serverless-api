import { getUserId } from "./user-lib";

/*
 * By using this helper to parse an HTTP event, we can use object destructuring
 * to parse all GET and POST parameters, as well as the Cognito Identity ID
 *
 * With this method, all POST parameters will override any GET parameters
 * of the same key name - we should avoid this situation anyway
 */

export const parseEvent = event => {
  let postBody = {};
  if (event.body) {
    try {
      postBody = JSON.parse(event.body);
    } catch (err) {
      console.error("event.body is not valid JSON!");
    }
  }

  return {
    ...event.pathParameters,
    ...postBody,
    userId: getUserId(event)
  };
};
