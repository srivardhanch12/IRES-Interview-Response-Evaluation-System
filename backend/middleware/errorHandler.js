export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size limit exceeded. Max 5MB allowed.'
    });
  }

  if (err.message === 'Only PDF files are allowed!') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
};
