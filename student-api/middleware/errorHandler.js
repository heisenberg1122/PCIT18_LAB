const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
    console.error("Stack:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server error"
    });
};

module.exports = errorHandler;