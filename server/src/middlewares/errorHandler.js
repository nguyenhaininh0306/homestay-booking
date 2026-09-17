export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Khong tim thay route: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'ID khong hop le' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Du lieu da ton tai' });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Loi he thong',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
