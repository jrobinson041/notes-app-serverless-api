import AWS from "aws-sdk";

// Call a general action on a table with any params
const call = (action, params, table) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const fullParams = {
    TableName: table,
    ...params
  };
  return dynamoDb[action](fullParams).promise();
};

/* Query a table with a custom expression string
 * and values defining the expression variables
 *
 * Example:
 *
 * expression = "userId = :userId"
 * values = {":userId": 234342}
 */
const query = (expression, values, table) =>
  call(
    "query",
    {
      KeyConditionExpression: expression,
      ExpressionAttributeValues: values
    },
    table
  );

/* Update a table with the keys to find the object
 * and the new object to update with
 *
 * Example:
 *
 * keys = {userId: 1234, noteId: abc123}
 * newItem = {content: "Some content", attachment: "hello.jpg"}
 */
const update = (keys, newItem, table) => {
  let expression =
    "SET " +
    Object.keys(newItem)
      .map(key => `${key} = :${key}`)
      .join(", ");
  let values = {};
  Object.keys(newItem).forEach(key => {
    values[`:${key}`] = newItem[key] || null;
  });
  return call(
    "update",
    {
      Key: keys,
      UpdateExpression: expression,
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW"
    },
    table
  );
};

// Use the above to create functions specific to the notes table
const notesTable = process.env.notesTableName;
export const Notes = {
  getByUser: userId =>
    query("userId = :userId", { ":userId": userId }, notesTable),

  get: (userId, noteId) => call("get", { Key: { userId, noteId } }, notesTable),

  put: item => call("put", { Item: item }, notesTable),

  update: (userId, noteId, updatedNote) =>
    update({ userId, noteId }, updatedNote, notesTable),

  delete: (userId, noteId) =>
    call("delete", { Key: { userId, noteId } }, notesTable)
};
