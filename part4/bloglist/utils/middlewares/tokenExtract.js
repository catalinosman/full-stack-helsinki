const tokenExtractor = (request, response, next) => {
  // Skip token extraction for GET requests
  if (request.method === "GET") {
    return next();
  }

  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};
module.exports = tokenExtractor;
