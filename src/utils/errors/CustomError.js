


class CustomError extends Error {
  constructor(message, statusCode) {
    super(message || 'An error occurred');
    this.statusCode = statusCode || 500;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'Error';
  }
}

module.exports = CustomError;
