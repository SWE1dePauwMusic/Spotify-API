function makeResponse(res, statusCode, data, error) {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        statusCode: statusCode,
        data: data || null,
        error: error || null,
    };

    return res.status(statusCode).json(response);
}

module.exports = makeResponse;
