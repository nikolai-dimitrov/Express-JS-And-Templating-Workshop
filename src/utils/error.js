exports.extractErrorMessage = function (error) {
  if (error instanceof MongooseError) {
    return Object.values(error.errors);
  } else if (error instanceof Error) {
    return [error.message];
  }
};
