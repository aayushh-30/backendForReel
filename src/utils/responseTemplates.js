class SuccessResponse {
    constructor(message, data) {
        this.status = 'success';
        this.message = message;
        this.data = data;
    }
}

class ErrorResponse {
    constructor(message, error) {
        this.message = message;
        this.status = 'error';
        this.error = error;

    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
};


