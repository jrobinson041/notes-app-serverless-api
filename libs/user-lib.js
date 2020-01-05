export const getUserId = event => {
  if (
    event &&
    event.requestContext &&
    event.requestContext.identity &&
    event.requestContext.identity.cognitoIdentityId
  ) {
    return event.requestContext.identity.cognitoIdentityId;
  } else {
    return false;
  }
};
