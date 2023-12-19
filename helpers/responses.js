exports.success = function (payload, message, res) {
  const data = {
    success: true,
    statusCode: res.statusCode,
    message,
    payload,
  };
  res.json(data);
  res.end();
};

exports.error = function (message, url, statusCode, res) {
  const data = {
    success: false,
    statusCode: res.statusCode,
    error: {
      message,
      url,
    },
  };
  res.json(data);
  res.end();
};
