module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(statuc, message, errors) {
    super();
  }
};
