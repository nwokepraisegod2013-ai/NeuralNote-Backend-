module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const response = {
    message: err.message || 'Internal server error',
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json(response);
};
