class MidErrorClass {
    notFound = (req, res, next) => {
        const error = new Error(
            `Not Found - ${req.originalUrl}`
        );
        res.status(404);
        next(error);
    };
    errorHandler = (error, req, res) => {
        const statusCode = res.statusCode === 200 ?
            500 : res.statusCode;
        res.status(statusCode);
        res.json({
            message: error.message,
            stack: error.stack
        });
    };
};

export const MidError = new MidErrorClass();



